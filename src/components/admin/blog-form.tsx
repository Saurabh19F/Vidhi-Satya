"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { blogSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/forms/image-upload-field";

type FormValues = z.infer<typeof blogSchema>;
type BlogFormInitialData = Partial<Omit<FormValues, "publishedAt"> & { publishedAt?: string | Date }>;

type BlogFormProps = {
  initialData?: BlogFormInitialData;
  loading?: boolean;
  onSubmit: (values: FormValues) => void;
};

export function BlogForm({ initialData, loading, onSubmit }: BlogFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch
  } = useForm<FormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      featuredImage: initialData?.featuredImage || "",
      author: initialData?.author || "",
      tags: initialData?.tags || [],
      isPublished: initialData?.isPublished ?? true,
      seoTitle: initialData?.seoTitle || "",
      seoDescription: initialData?.seoDescription || "",
      publishedAt: initialData?.publishedAt ? new Date(initialData.publishedAt) : new Date()
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Title</Label>
          <Input {...register("title")} />
        </div>
        <div>
          <Label>Slug</Label>
          <Input {...register("slug")} />
        </div>
      </div>
      <div>
        <Label>Excerpt</Label>
        <Textarea rows={2} {...register("excerpt")} />
      </div>
      <div>
        <Label>Content</Label>
        <Textarea rows={10} {...register("content")} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Author</Label>
          <Input {...register("author")} />
        </div>
        <div>
          <Label>Tags (comma separated)</Label>
          <Input
            defaultValue={initialData?.tags?.join(", ")}
            onChange={(event) => setValue("tags", event.target.value.split(",").map((i) => i.trim()).filter(Boolean))}
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>SEO Title</Label>
          <Input {...register("seoTitle")} />
        </div>
        <div>
          <Label>SEO Description</Label>
          <Input {...register("seoDescription")} />
        </div>
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("isPublished")} />
        <span className="text-sm">Published</span>
      </label>
      <ImageUploadField value={watch("featuredImage")} onChange={(url) => setValue("featuredImage", url)} />
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Blog"}
      </Button>
    </form>
  );
}
