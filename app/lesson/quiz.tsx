"use client";

import { challengeOptions, challenges as challengesTable } from "@/schema";
import { useState, useTransition, useEffect } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { reducedHearts } from "@/actions/user-progress";
import Image from "next/image";
import { useHeartsModal } from "../store/use-hearts-modal";

type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challengesTable.$inferSelect & {
    completed: boolean;
    challengeOptions: typeof challengeOptions.$inferSelect[];
  })[];
};

export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonChallenges,
}: Props) => {
    const { open: openHeartsModal } = useHeartsModal();
    const [pending, startTransition] = useTransition();
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);

    const lessonChallenges = initialLessonChallenges;

    const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = lessonChallenges.findIndex(
        (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    const isCompleted = activeIndex >= lessonChallenges.length;
    const challenge = lessonChallenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];
    const router = useRouter();

    useEffect(() => {
        if (isCompleted) {
        const timeout = setTimeout(() => {
        router.push("/learn");
        }, 2000);

        return () => clearTimeout(timeout);
    }
    }, [isCompleted, router]);

    const onNext = () => {
        setActiveIndex((current) => current + 1);
};

    const onSelect = (id: number) => {
        if (status !== "none") return;
        setSelectedOption(id);
};

    const onContinue = () => {
        if (!selectedOption) return;

        if (status === "wrong") {
            setStatus("none");
            setSelectedOption(undefined);
        return;
    }

        if (status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
    }
    
    const correctOption = options.find((o) => o.correct);

    if (correctOption?.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts"){
                openHeartsModal();
                return;
            }
            
            setStatus("correct");
            setPercentage((prev) => prev + 100 / lessonChallenges.length);

            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() =>
            toast.error("Something went wrong, please try again!")
          );
      });
    } else {
  startTransition(async () => {
    try {
      const response = await reducedHearts(challenge.id); 
      if (response.error === "hearts") {
        toast.error("You have no hearts left");
        openHeartsModal();
        return;
      }
      setStatus("wrong");
      if (response.success) {
        setHearts(response.hearts); 
      }
    } catch (err) {
      toast.error("Something went wrong, please try again");
    }
  });
}

}
  if (isCompleted) {
    return (
      <>
        <Header hearts={hearts} percentage={100} />
        <div className="flex-1 flex items-center justify-center">
          <h1 className="pt-20 text-3xl font-bold text-pink-500">
            Lesson completed 🎉
            <div className="relative flex items-center justify-center h-50 w-50 mb-4">
            <Image src="/character_pink_jump.svg" height={600} width={600} alt="Character pink" />
            </div>
          </h1>
        </div>
      </>
    );
  }

  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;

  return (
    <>
      <Header hearts={hearts} percentage={percentage} />

      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-87.5 lg:w-150 w-full px-10 lg:px-6 flex flex-col gap-y-12">
            <h1 className="mt-6 text-2xl lg:text-3xl text-center lg:text-start font-bold text-pink-500">
              {title}
            </h1>

            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}

              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer
        disabled={!selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};
