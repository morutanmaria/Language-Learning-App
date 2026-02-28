import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/queries";
import { redirect } from "next/navigation";
import  Image  from "next/image";
import { Progress } from "@/components/ui/progress";

const quests = [
    {
        title: "Earn 30 XP",
        value: 30,
    },
    {
        title: "Earn 40 XP",
        value: 40,
    },
    {
        title: "Earn 50 XP",
        value: 50,
    },
    {
        title: "Earn 100 XP",
        value: 100,
    },
    {
        title: "Earn 500 XP",
        value: 500,
    },
];

const QuestsPage = async () => {
    const userProgress = await getUserProgress();

    if(!userProgress || !userProgress.activeCourse){
        redirect("/courses");
    }
    return (
        <div className="flex flex-col items-start justify-between w-full px-14 gap-10 mt-0">
            <StickyWrapper>
                <UserProgress activeCourse={userProgress.activeCourse} hearts={userProgress.hearts} points={userProgress.points}/>
            </StickyWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image src="/quests.svg" alt="Quests" height={90} width={90}/>
                    <h1 className="text-center font-bold text-pink-700 text-2xl my-6">
                        Quests
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Complete quests by earning points
                    </p>
                    <ul className="w-full">
                        {quests.map((quest) => {
                            const progress = (userProgress.points / quest.value) * 100;
                            return (
                                <div key={quest.title} className="flex items-center w-full p-4 gap-x-4 border-t-2">
                                    <Image src="/points.svg" alt="Points" width={60} height={60}/>
                                    <div className="flex flex-col gap-y-2 w-full">
                                        <p className="text-pink-700 text-xl font-bold">
                                            {quest.title}
                                        </p>
                                        <Progress value={progress} className="h-3"/>

                                    </div>
                                </div>
                            )


                        })}

                    </ul>
                    
                </div>
        </div>
    );
};

export default QuestsPage;