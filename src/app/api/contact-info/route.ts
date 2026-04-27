import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import { assertAdmin } from "@/lib/route-admin";
import { contactInfoSchema } from "@/lib/validations";
import ContactInfo from "@/models/ContactInfo";

export async function GET() {
  try {
    await connectToDatabase();
    const info = await ContactInfo.findOne();
    return ok(info);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to fetch contact info.", 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const body = await request.json();
    const parsed = contactInfoSchema.safeParse(body);
    if (!parsed.success) return fail("Invalid contact info payload.", 422, parsed.error.flatten());

    const current = await ContactInfo.findOne();
    const updated = current
      ? await ContactInfo.findByIdAndUpdate(current._id, parsed.data, { new: true })
      : await ContactInfo.create(parsed.data);
    return ok(updated, "Contact info saved.");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to save contact info.", 500);
  }
}
