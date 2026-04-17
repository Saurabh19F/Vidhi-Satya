import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import { assertAdmin } from "@/lib/route-admin";
import { aboutSchema } from "@/lib/validations";
import About from "@/models/About";

export async function GET() {
  try {
    await connectToDatabase();
    const about = await About.findOne();
    return ok(about);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to fetch about content.", 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const body = await request.json();
    const parsed = aboutSchema.safeParse(body);
    if (!parsed.success) return fail("Invalid about payload.", 422, parsed.error.flatten());

    const current = await About.findOne();
    const updated = current
      ? await About.findByIdAndUpdate(current._id, parsed.data, { new: true })
      : await About.create(parsed.data);

    return ok(updated, "About content saved.");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to update about content.", 500);
  }
}
