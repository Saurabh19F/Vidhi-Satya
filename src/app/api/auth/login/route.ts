import { NextRequest } from "next/server";

import { fail, ok } from "@/lib/apiResponse";
import { comparePassword, setAuthCookie, signJwt } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { loginSchema } from "@/lib/validations";
import AdminUser from "@/models/AdminUser";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Invalid credentials payload.", 422, parsed.error.flatten());
    }

    const admin = await AdminUser.findOne({ email: parsed.data.email });
    if (!admin || !admin.isActive) {
      return fail("Invalid email or password.", 401);
    }

    const valid = await comparePassword(parsed.data.password, admin.password);
    if (!valid) {
      return fail("Invalid email or password.", 401);
    }

    const token = signJwt({
      id: String(admin._id),
      email: admin.email,
      role: admin.role
    });

    await setAuthCookie(token);

    return ok(
      {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      },
      "Login successful."
    );
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Failed to login.", 500);
  }
}
