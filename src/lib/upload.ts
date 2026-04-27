import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

type UploadResult = {
  url: string;
  provider: "cloudinary" | "local";
};

export async function uploadImage(file: File): Promise<UploadResult> {
  if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    // Cloudinary integration hook point. Local fallback keeps app runnable without external setup.
    return uploadToLocal(file);
  }
  return uploadToLocal(file);
}

async function uploadToLocal(file: File): Promise<UploadResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = file.name.split(".").pop() || "png";
  const fileName = `${randomUUID()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  const fullPath = path.join(uploadDir, fileName);
  await writeFile(fullPath, buffer);
  return {
    url: `/uploads/${fileName}`,
    provider: "local"
  };
}
