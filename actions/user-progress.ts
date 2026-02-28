"use server";

import { getCourseById, getUserProgress } from "@/queries";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "..";
import { challengeProgress, challenges, userProgress } from "@/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";


export const upsertUserProgress = async (courseId: number) => {
    const  { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) 
        throw new Error("User not authenticated");

    const course = await getCourseById(courseId);

    if(!course)
        throw new Error("Course not found");

    if(!course.units.length || !course.units[0].lessons.length)
        throw new Error("Course has no lessons");

    const existingUserProgress = await getUserProgress();

    if (existingUserProgress) {
        await db.update(userProgress).set({ 
            activeCourseId: courseId, 
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/images.svg",
        });
        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn");
    }
    await db.insert(userProgress).values({
        userId: userId,
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/images.svg",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");

};

export async function reducedHearts(challengeId: number) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const currentUserProgress = await getUserProgress();
    if (!currentUserProgress) throw new Error("User progress not found");

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId),
    });
    if (!challenge) throw new Error("Challenge not found");

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
        eq(challengeProgress.userId, userId),
        eq(challengeProgress.challengeId, challengeId)
        ),
    });

    const isPractice = !!existingChallengeProgress && existingChallengeProgress.completed;

    if (isPractice) {
        return { error: "practice" };
    }

    if (currentUserProgress.hearts === 0) {
        return { error: "hearts" };
    }

    const newHearts = Math.max(currentUserProgress.hearts - 1, 0);

    await db.update(userProgress)
        .set({ hearts: newHearts })
        .where(eq(userProgress.userId, userId));

    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${challenge.lessonId}`);

  return { success: true, hearts: newHearts };
}

export const refillHearts = async () => {
    const currentUserProgress = await getUserProgress();

    if(!currentUserProgress){
        throw new Error("User progress not found");
    }

    if(currentUserProgress.hearts === 5){
        throw new Error("Hearts already full");
    }

    if(currentUserProgress.points < 50){
        throw new Error("Not enough points");
    }

    await db.update(userProgress).set({
        hearts: 5, points: currentUserProgress.points - 50,
    }).where(eq(userProgress.userId, currentUserProgress.userId));

    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");

}