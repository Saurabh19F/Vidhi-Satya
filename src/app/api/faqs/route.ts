import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import { assertAdmin } from "@/lib/route-admin";
import { faqSchema } from "@/lib/validations";
import FAQ from "@/models/FAQ";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const showAll = request.nextUrl.searchParams.get("all") === "true";
    if (showAll) {
      const admin = await assertAdmin(request);
      if (!admin) return fail("Unauthorized.", 401);
      const list = await FAQ.find().sort({ order: 1 });
      return ok(list);
    }
    const list = await FAQ.find({ isPublished: true }).sort({ order: 1 });
    return ok(list);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to fetch FAQs.", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const body = await request.json();
    const parsed = faqSchema.safeParse(body);
    if (!parsed.success) return fail("Invalid FAQ payload.", 422, parsed.error.flatten());
    const created = await FAQ.create(parsed.data);
    return ok(created, "FAQ created.", 201);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to create FAQ.", 500);
  }
}
