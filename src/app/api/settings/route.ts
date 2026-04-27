import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import { assertAdmin } from "@/lib/route-admin";
import { siteSettingSchema } from "@/lib/validations";
import SiteSetting from "@/models/SiteSetting";

export async function GET() {
  try {
    await connectToDatabase();
    const settings = await SiteSetting.findOne();
    return ok(settings);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to fetch site settings.", 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const body = await request.json();
    const parsed = siteSettingSchema.safeParse(body);
    if (!parsed.success) return fail("Invalid settings payload.", 422, parsed.error.flatten());

    const current = await SiteSetting.findOne();
    const updated = current
      ? await SiteSetting.findByIdAndUpdate(current._id, parsed.data, { new: true })
      : await SiteSetting.create(parsed.data);
    return ok(updated, "Site settings saved.");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to save site settings.", 500);
  }
}
