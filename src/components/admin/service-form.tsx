"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { serviceSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/forms/image-upload-field";

type FormValues = z.infer<typeof serviceSchema>;

type ServiceFormProps = {
  initialData?: Partial<FormValues>;
  loading?: boolean;
  onSubmit: (values: FormValues) => void;
};

export function ServiceForm({ initialData, loading, onSubmit }: ServiceFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      shortDescription: initialData?.shortDescription || "",
      fullDescription: initialData?.fullDescription || "",
      category: initialData?.category || "Corporate Advisory",
      icon: initialData?.icon || "briefcase",
      imageUrl: initialData?.imageUrl || "",
      benefits: initialData?.benefits || [""],
      process: initialData?.process || [""],
      isFeatured: initialData?.isFeatured ?? false,
      isPublished: initialData?.isPublished ?? true,
      seoTitle: initialData?.seoTitle || "",
      seoDescription: initialData?.seoDescription || ""
    }
  });

  return (
    <form onSubmit={handleSubmit((values) => onSubmit(values))} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Title</Label>
          <Input {...register("title")} />
          {errors.title ? <p className="mt-1 text-xs text-red-600">{errors.title.message}</p> : null}
        </div>
        <div>
          <Label>Slug</Label>
          <Input {...register("slug")} />
        </div>
      </div>
      <div>
        <Label>Category</Label>
        <Input {...register("category")} />
      </div>
      <div>
        <Label>Short Description</Label>
        <Textarea rows={2} {...register("shortDescription")} />
      </div>
      <div>
        <Label>Full Description</Label>
        <Textarea rows={6} {...register("fullDescription")} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Benefits (comma separated)</Label>
          <Input
            defaultValue={initialData?.benefits?.join(", ")}
            onChange={(event) => setValue("benefits", event.target.value.split(",").map((i) => i.trim()).filter(Boolean))}
          />
        </div>
        <div>
          <Label>Process (comma separated)</Label>
          <Input
            defaultValue={initialData?.process?.join(", ")}
            onChange={(event) => setValue("process", event.target.value.split(",").map((i) => i.trim()).filter(Boolean))}
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
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("isFeatured")} />
          <span className="text-sm">Featured</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("isPublished")} />
          <span className="text-sm">Published</span>
        </label>
      </div>
      <ImageUploadField value={watch("imageUrl")} onChange={(url) => setValue("imageUrl", url)} />
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Service"}
      </Button>
    </form>
  );
}
