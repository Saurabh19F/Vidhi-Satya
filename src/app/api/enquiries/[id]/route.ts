import { NextRequest } from "next/server";
import { z } from "zod";

import { fail, ok } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import { assertAdmin } from "@/lib/route-admin";
import Enquiry from "@/models/Enquiry";

const statusSchema = z.object({
  status: z.enum(["new", "contacted", "closed"])
});

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, context: Context) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const body = await request.json();
    const parsed = statusSchema.safeParse(body);
    if (!parsed.success) return fail("Invalid enquiry status.", 422, parsed.error.flatten());
    const { id } = await context.params;
    const updated = await Enquiry.findByIdAndUpdate(id, { status: parsed.data.status }, { new: true });
    if (!updated) return fail("Enquiry not found.", 404);
    return ok(updated, "Enquiry updated.");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to update enquiry.", 500);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const { id } = await context.params;
    const deleted = await Enquiry.findByIdAndDelete(id);
    if (!deleted) return fail("Enquiry not found.", 404);
    return ok({}, "Enquiry deleted.");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to delete enquiry.", 500);
  }
}
