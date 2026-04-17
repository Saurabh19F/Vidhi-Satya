import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import { assertAdmin } from "@/lib/route-admin";
import { heroSchema } from "@/lib/validations";
import Hero from "@/models/Hero";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const showAll = request.nextUrl.searchParams.get("all") === "true";
    if (showAll) {
      const admin = await assertAdmin(request);
      if (!admin) return fail("Unauthorized.", 401);
      const slides = await Hero.find().sort({ order: 1 });
      return ok(slides);
    }
    const slides = await Hero.find({ isPublished: true }).sort({ order: 1 });
    return ok(slides);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to fetch hero slides.", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);

    await connectToDatabase();
    const body = await request.json();
    const parsed = heroSchema.safeParse(body);
    if (!parsed.success) return fail("Invalid hero payload.", 422, parsed.error.flatten());

    const created = await Hero.create(parsed.data);
    return ok(created, "Hero slide created.", 201);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to create hero slide.", 500);
  }
}
