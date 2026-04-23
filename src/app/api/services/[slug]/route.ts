import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import { normalizeService } from "@/lib/service-normalization";
import { assertAdmin } from "@/lib/route-admin";
import { slugify } from "@/lib/slugify";
import { serviceSchema } from "@/lib/validations";
import Service from "@/models/Service";

type Context = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, context: Context) {
  try {
    await connectToDatabase();
    const { slug } = await context.params;
    const document = await Service.findOne({
      $or: [{ _id: slug }, { slug }]
    }).catch(() => Service.findOne({ slug }));

    if (!document) return fail("Service not found.", 404);

    if (!document.isPublished) {
      const admin = await assertAdmin(request);
      if (!admin) return fail("Unauthorized.", 401);
    }

    return ok(normalizeService(document.toObject()));
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to fetch service.", 500);
  }
}

export async function PUT(request: NextRequest, context: Context) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const { slug } = await context.params;
    const body = await request.json();
    const parsed = serviceSchema.safeParse(body);
    if (!parsed.success) return fail("Invalid service payload.", 422, parsed.error.flatten());

    const payload = parsed.data;
    const generatedSlug = payload.slug ? slugify(payload.slug) : slugify(payload.title);
    const duplicate = await Service.findOne({ slug: generatedSlug, _id: { $ne: slug } });
    if (duplicate) return fail("Service slug already exists.", 409);

    const updated = await Service.findByIdAndUpdate(slug, { ...payload, slug: generatedSlug }, { new: true });
    if (!updated) return fail("Service not found.", 404);
    return ok(updated, "Service updated.");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to update service.", 500);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const { slug } = await context.params;
    const deleted = await Service.findByIdAndDelete(slug);
    if (!deleted) return fail("Service not found.", 404);
    return ok({}, "Service deleted.");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to delete service.", 500);
  }
}
