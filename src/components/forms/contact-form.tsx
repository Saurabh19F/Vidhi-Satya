"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { enquirySchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";

type FormValues = z.infer<typeof enquirySchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(enquirySchema)
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      toast.success("Thank you. Our team will contact you shortly.");
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Name</Label>
          <Input {...register("name")} />
          {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name.message}</p> : null}
        </div>
        <div>
          <Label>Email</Label>
          <Input {...register("email")} />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Phone</Label>
          <Input {...register("phone")} />
          {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p> : null}
        </div>
        <div>
          <Label>Subject</Label>
          <Input {...register("subject")} />
          {errors.subject ? <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p> : null}
        </div>
      </div>
      <div>
        <Label>Service Interested</Label>
        <Input {...register("serviceInterested")} />
      </div>
      <div>
        <Label>Message</Label>
        <Textarea rows={5} {...register("message")} />
        {errors.message ? <p className="mt-1 text-xs text-red-600">{errors.message.message}</p> : null}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Submitting..." : "Submit Enquiry"}
      </Button>
    </form>
  );
}
