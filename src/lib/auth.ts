import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { connectToDatabase } from "@/lib/db";
import AdminUser, { type AdminUserDocument } from "@/models/AdminUser";

const AUTH_COOKIE = "vs_admin_token";

type JwtPayload = {
  id: string;
  email: string;
  role: string;
};

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is missing.");
  }
  return secret;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signJwt(payload: JwtPayload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "1d" });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, getJwtSecret()) as JwtPayload;
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24
  });
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}

export async function getAuthTokenFromCookies() {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value;
}

export function getTokenFromRequest(request: NextRequest) {
  return request.cookies.get(AUTH_COOKIE)?.value;
}

export async function getCurrentAdmin() {
  try {
    await connectToDatabase();
    const token = await getAuthTokenFromCookies();
    if (!token) {
      return null;
    }
    const payload = verifyJwt(token);
    const admin = await AdminUser.findById(payload.id).select("-password");
    if (!admin || !admin.isActive) {
      return null;
    }
    return admin;
  } catch {
    return null;
  }
}

export async function requireAdminFromRequest(request: NextRequest): Promise<AdminUserDocument | null> {
  try {
    await connectToDatabase();
    const token = getTokenFromRequest(request);
    if (!token) {
      return null;
    }
    const payload = verifyJwt(token);
    const admin = await AdminUser.findById(payload.id);
    if (!admin || !admin.isActive) {
      return null;
    }
    return admin;
  } catch {
    return null;
  }
}
