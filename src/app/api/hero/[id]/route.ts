import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import { assertAdmin } from "@/lib/route-admin";
import { heroSchema } from "@/lib/validations";
import Hero from "@/models/Hero";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, context: Context) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();

    const { id } = await context.params;
    const body = await request.json();
    const parsed = heroSchema.safeParse(body);
    if (!parsed.success) return fail("Invalid hero payload.", 422, parsed.error.flatten());

    const updated = await Hero.findByIdAndUpdate(id, parsed.data, { new: true });
    if (!updated) return fail("Hero slide not found.", 404);
    return ok(updated, "Hero slide updated.");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to update hero slide.", 500);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const { id } = await context.params;
    const deleted = await Hero.findByIdAndDelete(id);
    if (!deleted) return fail("Hero slide not found.", 404);
    return ok({}, "Hero slide deleted.");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to delete hero slide.", 500);
  }
}
