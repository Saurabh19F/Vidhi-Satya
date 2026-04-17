import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import { assertAdmin } from "@/lib/route-admin";
import { faqSchema } from "@/lib/validations";
import FAQ from "@/models/FAQ";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, context: Context) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const body = await request.json();
    const parsed = faqSchema.safeParse(body);
    if (!parsed.success) return fail("Invalid FAQ payload.", 422, parsed.error.flatten());
    const { id } = await context.params;
    const updated = await FAQ.findByIdAndUpdate(id, parsed.data, { new: true });
    if (!updated) return fail("FAQ not found.", 404);
    return ok(updated, "FAQ updated.");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to update FAQ.", 500);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const { id } = await context.params;
    const deleted = await FAQ.findByIdAndDelete(id);
    if (!deleted) return fail("FAQ not found.", 404);
    return ok({}, "FAQ deleted.");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to delete FAQ.", 500);
  }
}
