import { getCourses, getUserProgress } from "@/queries";
import { List } from "./list";
const CoursesPage = async () => {
    const courses = await getCourses();
    const userProgress = await getUserProgress();
    
        return (
            <div className="h-full max-w-228 mx-auto">
                <h1 className="text-2xl font-bold text-pink-600">
                    Language Courses
                </h1>
                <List courses={courses} activeCourseId={userProgress?.activeCourseId}/>
            </div>
        );
};

export default CoursesPage;