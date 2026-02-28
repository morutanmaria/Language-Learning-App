import { db } from "@/index";
import { getIsAdmin } from "@/lib/auth";
import { challengeOptions } from "@/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: Promise<{ challengeOptionsId: string }> }) => {
    const { challengeOptionsId } = await params;
    const id = parseInt(challengeOptionsId);
    const data = await db.query.challengeOptions.findFirst({ 
        where: eq(challengeOptions.id, id) 
    });
    return NextResponse.json(data);
};

export const PUT = async (req: Request, { params }: { params: Promise<{ challengeOptionsId: string }> }) => {
    const { challengeOptionsId } = await params;
    const id = parseInt(challengeOptionsId);
    const body = await req.json();
    const { id: _, ...updateData } = body;

    const data = await db.update(challengeOptions).set(updateData).where(eq(challengeOptions.id, id)).returning();
    return NextResponse.json(data[0]);
};

export const DELETE = async (req: Request, { params }: { params: Promise<{ challengeOptionsId: string }> }) => {
    const { challengeOptionsId } = await params;
    const id = parseInt(challengeOptionsId);
    const data = await db.delete(challengeOptions).where(eq(challengeOptions.id, id)).returning();
    return NextResponse.json(data[0]);
};