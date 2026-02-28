import { NextResponse } from "next/server";
import { db } from "@/index";
import { getIsAdmin } from "@/lib/auth";
import { lessons } from "@/schema";

export const GET = async () => {
    const isAdmin = await getIsAdmin();
    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await db.query.lessons.findMany();
    
    return NextResponse.json(data, {
        headers: {
            "Content-Range": `lessons 0-${data.length - 1}/${data.length}`,
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

        const data = await db.insert(lessons).values({
            title: body.title,
            unitId: body.unitId, 
            order: body.order,   
        }).returning();

        return NextResponse.json(data[0]);

    } catch (error) {
        console.error("POST_ERROR_DETAIL:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};