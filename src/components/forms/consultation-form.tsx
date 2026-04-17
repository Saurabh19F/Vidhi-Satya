"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { enquirySchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const consultationSchema = enquirySchema.extend({
  preferredDate: z.string().optional()
});

type ConsultationValues = z.infer<typeof consultationSchema>;

type ConsultationFormProps = {
  serviceOptions: string[];
};

export function ConsultationForm({ serviceOptions }: ConsultationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<ConsultationValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      serviceInterested: serviceOptions[0] || "General Advisory"
    }
  });

  const onSubmit = async (values: ConsultationValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...values,
        subject: values.subject || "Consultation Request"
      };
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      toast.success("Consultation request submitted.");
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit consultation request.");
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
        </div>
        <div>
          <Label>Preferred Date</Label>
          <Input type="date" {...register("preferredDate")} />
        </div>
      </div>
      <div>
        <Label>Service</Label>
        <Select onValueChange={(value) => setValue("serviceInterested", value)} defaultValue={serviceOptions[0]}>
          <SelectTrigger>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {serviceOptions.map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Subject</Label>
        <Input {...register("subject")} placeholder="Consultation request" />
      </div>
      <div>
        <Label>Message</Label>
        <Textarea rows={5} {...register("message")} />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Submitting..." : "Request Consultation"}
      </Button>
    </form>
  );
}
