import { NextResponse } from "next/server";
import { db } from "@/index";
import { getIsAdmin } from "@/lib/auth";
import { challenges } from "@/schema";

export const GET = async () => {
    const isAdmin = await getIsAdmin();
    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await db.query.challenges.findMany();
    
    return NextResponse.json(data, {
        headers: {
            "Content-Range": `challenges 0-${data.length - 1}/${data.length}`,
            "Access-Control-Expose-Headers": "Content-Range",
        },
    });
};

export const POST = async (req: Request) => {
    try {
        const isAdmin = await getIsAdmin(); 
        if (!isAdmin) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();

        const data = await db.insert(challenges).values({
            question: body.question,
            type: body.type,
            lessonId: body.lessonId,
            order: body.order,
        }).returning();

        return NextResponse.json(data[0]);

    } catch (error) {
        console.error("POST_ERROR_DETAIL:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};