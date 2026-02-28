import { getLesson, getUserProgress } from "@/queries";
import { redirect } from "next/navigation";
import { Quiz } from "../quiz";

type Props = {
    params: {
        lessonId: number;
    };
};

const LessonIdPage = async ({ params }: Props) => {
    const lesson = await getLesson(params.lessonId);
    const userProgress = await getUserProgress();

    if(!lesson || !userProgress){
        redirect("/learn");
    }
    
    const initialPercentage = lesson.challenges.filter(
        (challenges) => challenges.completed).length / lesson.challenges.length * 100;
    return (
        <Quiz initialLessonId={lesson.id} initialLessonChallenges={lesson.challenges} initialHearts={userProgress.hearts} initialPercentage={initialPercentage}/>
            
    );
}

export default LessonIdPage;