import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import { assertAdmin } from "@/lib/route-admin";
import { seoSchema } from "@/lib/validations";
import SEO from "@/models/SEO";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const page = request.nextUrl.searchParams.get("page");
    if (page) {
      const one = await SEO.findOne({ page });
      return ok(one);
    }
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    const all = await SEO.find().sort({ page: 1 });
    return ok(all);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to fetch SEO settings.", 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const body = await request.json();
    const parsed = seoSchema.safeParse(body);
    if (!parsed.success) return fail("Invalid SEO payload.", 422, parsed.error.flatten());

    const updated = await SEO.findOneAndUpdate(
      { page: parsed.data.page },
      { $set: parsed.data },
      { new: true, upsert: true }
    );
    return ok(updated, "SEO settings saved.");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to save SEO settings.", 500);
  }
}
