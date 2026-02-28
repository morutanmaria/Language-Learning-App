import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/queries";
import { redirect } from "next/navigation";
import  Image  from "next/image";
import { Items } from "./items";

const ShopPage = async () => {
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
                    <Image src="/shop.svg" alt="Shop" height={80} width={80}/>
                    <h1 className="text-center font-bold text-pink-700 text-2xl my-6">
                        Shop
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Spend your points here!
                    </p>
                    <Items hearts={userProgress.hearts} points={userProgress.points}/>
                </div>
        </div>
    );
};

export default ShopPage;