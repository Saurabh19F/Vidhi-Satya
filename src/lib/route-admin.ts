import { NextRequest } from "next/server";

import { requireAdminFromRequest } from "@/lib/auth";

export async function assertAdmin(request: NextRequest) {
  const admin = await requireAdminFromRequest(request);
  if (!admin) {
    return null;
  }
  return admin;
}
