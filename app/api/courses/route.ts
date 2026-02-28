import { NextResponse } from "next/server";
import { db } from "@/index";
import { getIsAdmin } from "@/lib/auth";
import { coursesTable } from "@/schema";
import { eq } from "drizzle-orm";

export const GET = async () => {
    const isAdmin = await getIsAdmin();
    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await db.query.coursesTable.findMany();
    
    return NextResponse.json(data, {
        headers: {
            "Content-Range": `courses 0-${data.length - 1}/${data.length}`,
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

        const data = await db.insert(coursesTable).values({
            title: body.title,
            imageSrc: body.imageSrc,
        }).returning();

        return NextResponse.json(data[0]);

    } catch (error) {
        console.error("POST_ERROR_DETAIL:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
