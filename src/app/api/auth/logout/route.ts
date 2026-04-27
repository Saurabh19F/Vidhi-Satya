import { removeAuthCookie } from "@/lib/auth";
import { ok } from "@/lib/apiResponse";

export async function POST() {
  await removeAuthCookie();
  return ok({}, "Logged out.");
}
