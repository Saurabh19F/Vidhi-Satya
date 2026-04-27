import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import { assertAdmin } from "@/lib/route-admin";
import { slugify } from "@/lib/slugify";
import { blogSchema } from "@/lib/validations";
import Blog from "@/models/Blog";

type Context = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, context: Context) {
  try {
    await connectToDatabase();
    const { slug } = await context.params;
    const document = await Blog.findOne({
      $or: [{ _id: slug }, { slug }]
    }).catch(() => Blog.findOne({ slug }));

    if (!document) return fail("Blog not found.", 404);
    if (!document.isPublished) {
      const admin = await assertAdmin(request);
      if (!admin) return fail("Unauthorized.", 401);
    }
    return ok(document);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to fetch blog.", 500);
  }
}

export async function PUT(request: NextRequest, context: Context) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const { slug } = await context.params;
    const body = await request.json();
    const parsed = blogSchema.safeParse(body);
    if (!parsed.success) return fail("Invalid blog payload.", 422, parsed.error.flatten());

    const payload = parsed.data;
    const generatedSlug = payload.slug ? slugify(payload.slug) : slugify(payload.title);
    const duplicate = await Blog.findOne({ slug: generatedSlug, _id: { $ne: slug } });
    if (duplicate) return fail("Blog slug already exists.", 409);

    const updated = await Blog.findByIdAndUpdate(
      slug,
      {
        ...payload,
        slug: generatedSlug,
        publishedAt: payload.publishedAt || new Date()
      },
      { new: true }
    );
    if (!updated) return fail("Blog not found.", 404);
    return ok(updated, "Blog updated.");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to update blog.", 500);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const { slug } = await context.params;
    const deleted = await Blog.findByIdAndDelete(slug);
    if (!deleted) return fail("Blog not found.", 404);
    return ok({}, "Blog deleted.");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to delete blog.", 500);
  }
}
