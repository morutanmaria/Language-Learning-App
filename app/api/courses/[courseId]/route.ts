import { db } from "@/index";
import { getIsAdmin } from "@/lib/auth";
import { coursesTable } from "@/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  try {
    const isAdmin = await getIsAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { courseId } = await params;
    const id = parseInt(courseId);

    if (isNaN(id)) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const record = await db.query.coursesTable.findFirst({
      where: eq(coursesTable.id, id),
    });

    if (!record) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(record);
  } catch (error) {
    console.error("GET_COURSE_ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  try {
    const isAdmin = await getIsAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { courseId } = await params;
    const id = parseInt(courseId);
    
    if (isNaN(id)) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const body = await req.json();

    const updated = await db
      .update(coursesTable)
      .set({ ...body })
      .where(eq(coursesTable.id, id))
      .returning();

    if (!updated || updated.length === 0) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("PUT_COURSE_ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) => {
  try {
    const isAdmin = await getIsAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { courseId } = await params;
    const id = parseInt(courseId);

    if (isNaN(id)) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const deleted = await db
      .delete(coursesTable)
      .where(eq(coursesTable.id, id))
      .returning();

    if (!deleted || deleted.length === 0) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(deleted[0]);
  } catch (error) {
    console.error("DELETE_COURSE_ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};