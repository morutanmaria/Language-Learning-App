import { NextResponse } from "next/server";
import { db } from "@/index";
import { getIsAdmin } from "@/lib/auth";
import { units } from "@/schema";

export const GET = async () => {
    const isAdmin = await getIsAdmin();
    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await db.query.units.findMany();
    
    return NextResponse.json(data, {
        headers: {
            // Note: Changed range header name to 'units'
            "Content-Range": `units 0-${data.length - 1}/${data.length}`,
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

        // FIX: Use the correct fields for the Units table
        const data = await db.insert(units).values({
            title: body.title,
            description: body.description,
            courseId: body.courseId,
            order: body.order,
        }).returning();

        return NextResponse.json(data[0]);

    } catch (error) {
        console.error("POST_ERROR_DETAIL:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};