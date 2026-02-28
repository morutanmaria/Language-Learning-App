import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getTopTenUsers, getUserProgress } from "@/queries";
import { redirect } from "next/navigation";
import  Image  from "next/image";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const LeaderPage = async () => {
    const userProgress = await getUserProgress();
    const leaderboard = await getTopTenUsers();

    if(!userProgress || !userProgress.activeCourse){
        redirect("/courses");
    }
    return (
        <div className="flex flex-col items-start justify-between w-full px-14 gap-10 mt-0">
            <StickyWrapper>
                <UserProgress activeCourse={userProgress.activeCourse} hearts={userProgress.hearts} points={userProgress.points}/>
            </StickyWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image src="/leaderboard.svg" alt="Leaderboard" height={80} width={80}/>
                    <h1 className="text-center font-bold text-pink-700 text-2xl my-6">
                        Leaderboard
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        See where you stand among others!
                    </p>
                    <Separator className="mb-4 h-0.5 rounded-full"/>
                    {leaderboard.map((userProgress, index) => (
                        <div key={userProgress.userId} className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50">
                            <p className="font-bold text-pink-700 mr-4">{index + 1}</p>
                            <Avatar className="border bg-pink-500 h-12 w-12 ml-3 mr-6">
                                <AvatarImage className="object-cover" src={userProgress.userImageSrc}/>
                            </Avatar>
                            <p className="font-bold text-pink-600 flex-1">
                                {userProgress.userName}
                            </p>
                            <p className="text-muted-foreground">
                                {userProgress.points} XP
                            </p>

                        </div>
                    ))}
                </div>
        </div>
    );
};

export default LeaderPage;