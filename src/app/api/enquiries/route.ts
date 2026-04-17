import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/apiResponse";
import { connectToDatabase } from "@/lib/db";
import { assertAdmin } from "@/lib/route-admin";
import { enquirySchema } from "@/lib/validations";
import Enquiry from "@/models/Enquiry";

export async function GET(request: NextRequest) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);
    await connectToDatabase();
    const status = request.nextUrl.searchParams.get("status");
    const query = status ? { status } : {};
    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
    return ok(enquiries);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to fetch enquiries.", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) return fail("Invalid enquiry payload.", 422, parsed.error.flatten());
    const created = await Enquiry.create(parsed.data);
    return ok(created, "Enquiry submitted.", 201);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to submit enquiry.", 500);
  }
}
