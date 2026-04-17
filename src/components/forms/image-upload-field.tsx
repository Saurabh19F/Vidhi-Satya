"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ImageUploadFieldProps = {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
};

export function ImageUploadField({ value, onChange, label = "Image" }: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      onChange(json.data.url);
      toast.success("Image uploaded successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">{label}</p>
      <Input type="file" accept="image/*" onChange={handleUpload} />
      {uploading ? (
        <Button type="button" disabled variant="outline">
          <UploadCloud className="mr-2 h-4 w-4 animate-pulse" /> Uploading...
        </Button>
      ) : null}
      {value ? (
        <div className="relative h-40 w-full overflow-hidden rounded-lg border">
          <Image src={value} alt={label} fill className="object-cover" />
        </div>
      ) : null}
    </div>
  );
}
