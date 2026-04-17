import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import { assertAdmin } from "@/lib/route-admin";
import { testimonialSchema } from "@/lib/validations";
import Testimonial from "@/models/Testimonial";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const showAll = request.nextUrl.searchParams.get("all") === "true";
    if (showAll) {
      const admin = await assertAdmin(request);
      if (!admin) return fail("Unauthorized.", 401);
      const list = await Testimonial.find().sort({ createdAt: -1 });
      return ok(list);
    }
    const list = await Testimonial.find({ isPublished: true }).sort({ createdAt: -1 });
    return ok(list);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to fetch testimonials.", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const body = await request.json();
    const parsed = testimonialSchema.safeParse(body);
    if (!parsed.success) return fail("Invalid testimonial payload.", 422, parsed.error.flatten());
    const created = await Testimonial.create(parsed.data);
    return ok(created, "Testimonial created.", 201);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to create testimonial.", 500);
  }
}
