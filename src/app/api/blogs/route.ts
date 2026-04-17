import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import { assertAdmin } from "@/lib/route-admin";
import { slugify } from "@/lib/slugify";
import { blogSchema } from "@/lib/validations";
import Blog from "@/models/Blog";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const showAll = request.nextUrl.searchParams.get("all") === "true";
    const search = request.nextUrl.searchParams.get("search");
    const tag = request.nextUrl.searchParams.get("tag");

    const query: Record<string, unknown> = {};
    if (!showAll) {
      query.isPublished = true;
    }
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (tag) {
      query.tags = tag;
    }

    if (showAll) {
      const admin = await assertAdmin(request);
      if (!admin) return fail("Unauthorized.", 401);
    }

    const blogs = await Blog.find(query).sort({ publishedAt: -1 });
    return ok(blogs);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to fetch blogs.", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const body = await request.json();
    const parsed = blogSchema.safeParse(body);
    if (!parsed.success) return fail("Invalid blog payload.", 422, parsed.error.flatten());

    const payload = parsed.data;
    const slug = payload.slug ? slugify(payload.slug) : slugify(payload.title);
    const exists = await Blog.findOne({ slug });
    if (exists) return fail("Blog slug already exists.", 409);

    const created = await Blog.create({
      ...payload,
      slug,
      publishedAt: payload.publishedAt || new Date()
    });
    return ok(created, "Blog created.", 201);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to create blog.", 500);
  }
}
