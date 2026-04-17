"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { heroSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/forms/image-upload-field";

type FormValues = z.infer<typeof heroSchema>;

type HeroFormProps = {
  initialData?: Partial<FormValues>;
  loading?: boolean;
  onSubmit: (values: FormValues) => void;
};

export function HeroForm({ initialData, loading, onSubmit }: HeroFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      title: initialData?.title || "",
      subtitle: initialData?.subtitle || "",
      description: initialData?.description || "",
      buttonText: initialData?.buttonText || "Book Consultation",
      buttonLink: initialData?.buttonLink || "/book-consultation",
      imageUrl: initialData?.imageUrl || "",
      order: initialData?.order || 1,
      isPublished: initialData?.isPublished ?? true
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input {...register("title")} />
        {errors.title ? <p className="mt-1 text-xs text-red-600">{errors.title.message}</p> : null}
      </div>
      <div>
        <Label>Subtitle</Label>
        <Input {...register("subtitle")} />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea rows={4} {...register("description")} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Button Text</Label>
          <Input {...register("buttonText")} />
        </div>
        <div>
          <Label>Button Link</Label>
          <Input {...register("buttonLink")} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Order</Label>
          <Input type="number" {...register("order")} />
        </div>
        <label className="flex items-center gap-2 pt-7">
          <input type="checkbox" {...register("isPublished")} />
          <span className="text-sm">Published</span>
        </label>
      </div>
      <ImageUploadField value={watch("imageUrl")} onChange={(url) => setValue("imageUrl", url)} />
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Hero Slide"}
      </Button>
    </form>
  );
}
