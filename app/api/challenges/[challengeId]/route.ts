import { db } from "@/index";
import { getIsAdmin } from "@/lib/auth";
import { challenges } from "@/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ challengeId: string }> }
) => {
  try {
    const isAdmin = await getIsAdmin();
    if (!isAdmin) return new NextResponse("Unauthorized", { status: 403 });

    const { challengeId } = await params;
    const id = parseInt(challengeId);

    if (isNaN(id)) return new NextResponse("Invalid ID", { status: 400 });

    const record = await db.query.challenges.findFirst({
      where: eq(challenges.id, id),
    });

    if (!record) return new NextResponse("Not Found", { status: 404 });

    return NextResponse.json(record);
  } catch (error) {
    console.error("GET_CHALLENGE_ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ challengeId: string }> }
) => {
  try {
    const isAdmin = await getIsAdmin();
    if (!isAdmin) return new NextResponse("Unauthorized", { status: 403 });

    const { challengeId } = await params;
    const id = parseInt(challengeId);
    
    if (isNaN(id)) return new NextResponse("Invalid ID", { status: 400 });

    const body = await req.json();
    const { id: _, ...updateData } = body;

    const updated = await db
      .update(challenges)
      .set(updateData)
      .where(eq(challenges.id, id))
      .returning();

    if (!updated || updated.length === 0) return new NextResponse("Not Found", { status: 404 });

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("PUT_CHALLENGE_ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ challengeId: string }> }
) => {
  try {
    const isAdmin = await getIsAdmin();
    if (!isAdmin) return new NextResponse("Unauthorized", { status: 403 });

    const { challengeId } = await params;
    const id = parseInt(challengeId);

    if (isNaN(id)) return new NextResponse("Invalid ID", { status: 400 });

    const deleted = await db
      .delete(challenges)
      .where(eq(challenges.id, id))
      .returning();

    if (!deleted || deleted.length === 0) return new NextResponse("Not Found", { status: 404 });

    return NextResponse.json(deleted[0]);
  } catch (error) {
    console.error("DELETE_CHALLENGE_ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};