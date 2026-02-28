import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database...");
        await db.delete(schema.coursesTable);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.coursesTable).values([
            {
                id: 1,
                title: "English",
                imageSrc: "/us.svg",
            },
             {
                id: 2,
                title: "German",
                imageSrc: "/de.svg",
            },
             {
                id: 3,
                title: "Romanian",
                imageSrc: "/ro.svg",
            },
             {
                id: 4,
                title: "Italian",
                imageSrc: "/it.svg",
            },
           ]);

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: "Unit 1",
                description: "Learn the basics of English",
                order: 1,
            },
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: "Nouns",
                
            },
            {
                id: 2,
                unitId: 1,
                order: 2,
                title: "Verbs",
                
            },
            {
                id: 3,
                unitId: 1,
                order: 3,
                title: "Colors",
                
            },

        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                question: "Which one of these is 'the woman'?",
                order: 1,
            },
            {
                id: 2,
                lessonId: 1,
                type: "ASSIST",
                question: "The man?",
                order: 2,
            },
            {
                id: 3,
                lessonId: 1,
                type: "SELECT",
                question: "Which one of these is 'the robot'?",
                order: 3,
            },
            
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1,
                imageSrc: "/woman.svg",
                correct: true,
                text: "the woman",
                audioSrc: "/en_woman.mp3",
            },
            {
                id: 2,
                challengeId: 1,
                imageSrc: "/man.svg",
                correct: false,
                text: "the man",
                audioSrc: "/en_man.mp3",
            },
            {
                id: 3,
                challengeId: 1,
                imageSrc: "/robot.svg",
                correct: false,
                text: "the robot",
                audioSrc: "/en_robot.mp3",
            },
            {
                id: 4,
                challengeId: 2,
                correct: false,
                text: "the woman",
                audioSrc: "/en_woman.mp3",
            },
            {
                id: 5,
                challengeId: 2,
                correct: true,
                text: "the man",
                audioSrc: "/en_man.mp3",
            },
            {
                id: 6,
                challengeId: 2,
                correct: false,
                text: "the robot",
                audioSrc: "/en_robot.mp3",
            },
            {
                id: 7,
                challengeId: 3,
                imageSrc: "/woman.svg",
                correct: false,
                text: "the woman",
                audioSrc: "/en_woman.mp3",
            },
            {
                id: 8,
                challengeId: 3,
                imageSrc: "/man.svg",
                correct: false,
                text: "the man",
                audioSrc: "/en_man.mp3",
            },
            {
                id: 9,
                challengeId: 3,
                imageSrc: "/robot.svg",
                correct: true,
                text: "the robot",
                audioSrc: "/en_robot.mp3",
            },
        ]);
        
        console.log("Database seeded successfully.");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

main();