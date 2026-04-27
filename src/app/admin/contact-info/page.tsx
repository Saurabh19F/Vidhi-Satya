"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { contactInfoSchema } from "@/lib/validations";

type FormValues = z.infer<typeof contactInfoSchema>;

export default function AdminContactInfoPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(contactInfoSchema)
  });

  useEffect(() => {
    fetch("/api/contact-info")
      .then((res) => res.json())
      .then((json) => {
        if (json.data) reset(json.data);
      });
  }, [reset]);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      toast.success("Contact info saved.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save contact info.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminHeader title="Manage Contact Info" />
      <div className="p-4 md:p-8">
        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Company Name</Label>
                  <Input {...register("companyName")} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input {...register("email")} />
                </div>
              </div>
              <div>
                <Label>Address</Label>
                <Input {...register("address")} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Phone</Label>
                  <Input {...register("phone")} />
                </div>
                <div>
                  <Label>WhatsApp</Label>
                  <Input {...register("whatsapp")} />
                </div>
              </div>
              <div>
                <Label>Google Map Link</Label>
                <Input {...register("googleMapLink")} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>LinkedIn</Label>
                  <Input {...register("linkedin")} placeholder="https://www.linkedin.com/company/east-delhi-law-office/" />
                </div>
                <div>
                  <Label>Twitter</Label>
                  <Input {...register("twitter")} />
                </div>
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Contact Info"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
