import { NextResponse } from "next/server";
import { db } from "@/index";
import { getIsAdmin } from "@/lib/auth";
import { challengeOptions } from "@/schema";

export const GET = async () => {
    if (!(await getIsAdmin())) return new NextResponse("Unauthorized", { status: 401 });

    const data = await db.query.challengeOptions.findMany();
    
    return NextResponse.json(data, {
        headers: {
            "Content-Range": `challengeOptions 0-${data.length - 1}/${data.length}`,
            "Access-Control-Expose-Headers": "Content-Range",
        },
    });
};

export const POST = async (req: Request) => {
    try {
        if (!(await getIsAdmin())) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const data = await db.insert(challengeOptions).values({
            challengeId: body.challengeId,
            text: body.text,
            correct: body.correct,
            imageSrc: body.imageSrc,
            audioSrc: body.audioSrc,
        }).returning();

        return NextResponse.json(data[0]);
    } catch (error) {
        console.error("CHALLENGE_OPTION_POST_ERROR:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};