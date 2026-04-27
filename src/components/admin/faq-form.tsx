"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { faqSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormValues = z.infer<typeof faqSchema>;

type FAQFormProps = {
  initialData?: Partial<FormValues>;
  loading?: boolean;
  onSubmit: (values: FormValues) => void;
};

export function FAQForm({ initialData, loading, onSubmit }: FAQFormProps) {
  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: initialData?.question || "",
      answer: initialData?.answer || "",
      category: initialData?.category || "General",
      order: initialData?.order || 1,
      isPublished: initialData?.isPublished ?? true
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Question</Label>
        <Input {...register("question")} />
      </div>
      <div>
        <Label>Answer</Label>
        <Textarea rows={5} {...register("answer")} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Category</Label>
          <Input {...register("category")} />
        </div>
        <div>
          <Label>Order</Label>
          <Input type="number" {...register("order")} />
        </div>
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("isPublished")} />
        <span className="text-sm">Published</span>
      </label>
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save FAQ"}
      </Button>
    </form>
  );
}
