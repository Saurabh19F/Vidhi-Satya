import { fail, ok } from "@/lib/apiResponse";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return fail("Unauthorized.", 401);
  }
  return ok(admin, "Authenticated.");
}
