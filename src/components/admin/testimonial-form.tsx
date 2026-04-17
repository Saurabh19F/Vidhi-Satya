"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { testimonialSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/forms/image-upload-field";

type FormValues = z.infer<typeof testimonialSchema>;

type TestimonialFormProps = {
  initialData?: Partial<FormValues>;
  loading?: boolean;
  onSubmit: (values: FormValues) => void;
};

export function TestimonialForm({ initialData, loading, onSubmit }: TestimonialFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch
  } = useForm<FormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: initialData?.name || "",
      designation: initialData?.designation || "",
      company: initialData?.company || "",
      message: initialData?.message || "",
      rating: initialData?.rating || 5,
      imageUrl: initialData?.imageUrl || "",
      isPublished: initialData?.isPublished ?? true
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Name</Label>
          <Input {...register("name")} />
        </div>
        <div>
          <Label>Designation</Label>
          <Input {...register("designation")} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Company</Label>
          <Input {...register("company")} />
        </div>
        <div>
          <Label>Rating (1-5)</Label>
          <Input type="number" min={1} max={5} {...register("rating")} />
        </div>
      </div>
      <div>
        <Label>Message</Label>
        <Textarea rows={5} {...register("message")} />
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("isPublished")} />
        <span className="text-sm">Published</span>
      </label>
      <ImageUploadField value={watch("imageUrl")} onChange={(url) => setValue("imageUrl", url)} />
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Testimonial"}
      </Button>
    </form>
  );
}
