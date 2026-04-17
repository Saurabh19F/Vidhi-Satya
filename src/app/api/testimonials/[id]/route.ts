import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import { assertAdmin } from "@/lib/route-admin";
import { testimonialSchema } from "@/lib/validations";
import Testimonial from "@/models/Testimonial";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, context: Context) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const body = await request.json();
    const parsed = testimonialSchema.safeParse(body);
    if (!parsed.success) return fail("Invalid testimonial payload.", 422, parsed.error.flatten());
    const { id } = await context.params;
    const updated = await Testimonial.findByIdAndUpdate(id, parsed.data, { new: true });
    if (!updated) return fail("Testimonial not found.", 404);
    return ok(updated, "Testimonial updated.");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to update testimonial.", 500);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const { id } = await context.params;
    const deleted = await Testimonial.findByIdAndDelete(id);
    if (!deleted) return fail("Testimonial not found.", 404);
    return ok({}, "Testimonial deleted.");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to delete testimonial.", 500);
  }
}
