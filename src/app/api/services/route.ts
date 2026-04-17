import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import { assertAdmin } from "@/lib/route-admin";
import { slugify } from "@/lib/slugify";
import { serviceSchema } from "@/lib/validations";
import Service from "@/models/Service";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const showAll = request.nextUrl.searchParams.get("all") === "true";
    if (showAll) {
      const admin = await assertAdmin(request);
      if (!admin) return fail("Unauthorized.", 401);
      const services = await Service.find().sort({ createdAt: -1 });
      return ok(services);
    }
    const services = await Service.find({ isPublished: true }).sort({ isFeatured: -1, createdAt: -1 });
    return ok(services);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to fetch services.", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const body = await request.json();
    const parsed = serviceSchema.safeParse(body);
    if (!parsed.success) return fail("Invalid service payload.", 422, parsed.error.flatten());

    const payload = parsed.data;
    const slug = payload.slug ? slugify(payload.slug) : slugify(payload.title);
    const exists = await Service.findOne({ slug });
    if (exists) return fail("Service slug already exists.", 409);

    const created = await Service.create({ ...payload, slug });
    return ok(created, "Service created.", 201);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to create service.", 500);
  }
}
