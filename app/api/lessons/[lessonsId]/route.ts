import { db } from "@/index";
import { getIsAdmin } from "@/lib/auth";
import { lessons } from "@/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ lessonsId: string }> } 
) => {
  try {
    const isAdmin = await getIsAdmin();
    if (!isAdmin) return new NextResponse("Unauthorized", { status: 403 });

    const allParams = await params;
    const { lessonsId } = allParams; 
    const id = parseInt(lessonsId);

    if (isNaN(id)) return new NextResponse("Invalid ID", { status: 400 });

    const record = await db.query.lessons.findFirst({
      where: eq(lessons.id, id),
    });

    if (!record) return new NextResponse("Not Found", { status: 404 });

    return NextResponse.json(record);
  } catch (error) {
    console.error("GET_LESSON_ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ lessonsId: string }> }
) => {
  try {
    const isAdmin = await getIsAdmin();
    if (!isAdmin) return new NextResponse("Unauthorized", { status: 403 });

    const { lessonsId } = await params;
    const id = parseInt(lessonsId);
    
    if (isNaN(id)) return new NextResponse("Invalid ID", { status: 400 });

    const body = await req.json();
    const { id: _, ...updateData } = body;

    const updated = await db
      .update(lessons)
      .set(updateData)
      .where(eq(lessons.id, id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("PUT_LESSON_ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ lessonsId: string }> }
) => {
  try {
    const isAdmin = await getIsAdmin();
    if (!isAdmin) return new NextResponse("Unauthorized", { status: 403 });

    const { lessonsId } = await params;
    const id = parseInt(lessonsId);

    if (isNaN(id)) return new NextResponse("Invalid ID", { status: 400 });

    const deleted = await db
      .delete(lessons)
      .where(eq(lessons.id, id))
      .returning();

    return NextResponse.json(deleted[0]);
  } catch (error) {
    console.error("DELETE_LESSON_ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};