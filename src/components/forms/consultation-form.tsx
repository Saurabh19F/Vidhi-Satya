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

function requiresDepartmentAndDesignation(serviceInterested?: string) {
  const value = (serviceInterested || "").toLowerCase();
  return value.includes("corporate") || value.includes("government") || value.includes("gov");
}

function isWeekendDate(value?: string) {
  if (!value) return false;
  const date = new Date(`${value}T00:00:00`);
  const day = date.getDay();
  return day === 0 || day === 6;
}

const consultationSchema = enquirySchema.extend({
  preferredDate: z.string().optional()
}).superRefine((values, ctx) => {
  const needsDepartmentAndDesignation = requiresDepartmentAndDesignation(values.serviceInterested);
  if (needsDepartmentAndDesignation) {
    if (!values.department?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Department is required for corporate/government consultations.",
        path: ["department"]
      });
    }

    if (!values.designation?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Designation is required for corporate/government consultations.",
        path: ["designation"]
      });
    }
  }

  if (isWeekendDate(values.preferredDate)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please select a weekday (Monday to Friday).",
      path: ["preferredDate"]
    });
  }
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
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm<ConsultationValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      serviceInterested: serviceOptions[0] || "General Advisory",
      department: "",
      designation: ""
    }
  });
  const selectedService = watch("serviceInterested");
  const preferredDateField = register("preferredDate");
  const showDepartmentAndDesignation = requiresDepartmentAndDesignation(selectedService);

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
          <Input
            type="date"
            {...preferredDateField}
            onChange={(event) => {
              preferredDateField.onChange(event);
              const value = event.target.value;
              if (isWeekendDate(value)) {
                setValue("preferredDate", "", { shouldValidate: true, shouldDirty: true });
                setError("preferredDate", {
                  type: "manual",
                  message: "Please select a weekday (Monday to Friday)."
                });
                toast.error("Saturday and Sunday are unavailable. Please select a weekday.");
                return;
              }
              clearErrors("preferredDate");
            }}
          />
          {errors.preferredDate ? <p className="mt-1 text-xs text-red-600">{errors.preferredDate.message}</p> : null}
        </div>
      </div>
      <div>
        <Label>Service</Label>
        <Select
          value={selectedService}
          onValueChange={(value) => {
            setValue("serviceInterested", value, { shouldValidate: true, shouldDirty: true });
            if (!requiresDepartmentAndDesignation(value)) {
              setValue("department", "", { shouldValidate: true });
              setValue("designation", "", { shouldValidate: true });
            }
          }}
        >
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
      {showDepartmentAndDesignation ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Department</Label>
            <Input {...register("department")} placeholder="Enter department" />
            {errors.department ? <p className="mt-1 text-xs text-red-600">{errors.department.message}</p> : null}
          </div>
          <div>
            <Label>Designation</Label>
            <Input {...register("designation")} placeholder="Enter designation" />
            {errors.designation ? <p className="mt-1 text-xs text-red-600">{errors.designation.message}</p> : null}
          </div>
        </div>
      ) : null}
      <div>
        <Label>Subject</Label>
        <Input {...register("subject")} placeholder="Consultation request" />
      </div>
      <div>
        <Label>Message</Label>
        <Textarea rows={5} {...register("message")} />
      </div>
      <div className="space-y-2">
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "Submitting..." : "Request Consultation"}
        </Button>
        <p className="text-xs text-muted-foreground">This will be deemed a client-attorney conversion.</p>
      </div>
    </form>
  );
}
