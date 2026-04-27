import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/apiResponse";
import { assertAdmin } from "@/lib/route-admin";
import { uploadImage } from "@/lib/upload";

export async function POST(request: NextRequest) {
  try {
    const admin = await assertAdmin(request);
    if (!admin) return fail("Unauthorized.", 401);

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return fail("File is required.", 400);
    }

    const result = await uploadImage(file);
    return ok(result, "Image uploaded.");
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to upload image.", 500);
  }
}
