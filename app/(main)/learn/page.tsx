import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/queries";
import { redirect } from "next/navigation";
import { Unit } from "./unit";

const LearnPage = async () => {
  const userProgress = await getUserProgress();
  const unitsData = await getUnits();
  const courseProgress = await getCourseProgress();
  const lessonPercentage = await getLessonPercentage();

  if(!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  if(!courseProgress){
    redirect("/courses");
  }

  return (
    <div className="flex flex-col-reverse gap-12 px-6 items-start">
      
        <div className="w-full">
          <StickyWrapper>
            <UserProgress
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            />
          </StickyWrapper>
          <FeedWrapper>
          <div className="sticky top-0 z-50 bg-white">
            <Header title={userProgress.activeCourse.title}/>
            {
              unitsData.map((unit)=> (
                <div key={unit.id} className="mb-10">
                  <Unit id={unit.id} order={unit.order} description={unit.description} title={unit.title} lessons={unit.lessons} activeLesson={courseProgress.activeLesson} activeLessonPercentage={lessonPercentage} />
                </div>
            ))}
            </div>
      </FeedWrapper>
      </div>
    </div>
  );
};

export default LearnPage;
