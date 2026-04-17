"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { AdminHeader } from "@/components/admin/admin-header";
import { ImageUploadField } from "@/components/forms/image-upload-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteSettingSchema } from "@/lib/validations";

type FormValues = z.infer<typeof siteSettingSchema>;

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue, watch } = useForm<FormValues>({
    resolver: zodResolver(siteSettingSchema)
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((json) => {
        if (json.data) reset(json.data);
      });
  }, [reset]);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      toast.success("Settings saved.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminHeader title="Manage Settings" />
      <div className="p-4 md:p-8">
        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle>Site Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Site Name</Label>
                  <Input {...register("siteName")} />
                </div>
                <div>
                  <Label>CTA Text</Label>
                  <Input {...register("ctaText")} />
                </div>
              </div>
              <div>
                <Label>Footer Text</Label>
                <Input {...register("footerText")} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Primary Color</Label>
                  <Input {...register("primaryColor")} />
                </div>
                <div>
                  <Label>Secondary Color</Label>
                  <Input {...register("secondaryColor")} />
                </div>
              </div>
              <ImageUploadField label="Logo" value={watch("logoUrl")} onChange={(url) => setValue("logoUrl", url)} />
              <ImageUploadField label="Favicon" value={watch("faviconUrl")} onChange={(url) => setValue("faviconUrl", url)} />
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Settings"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
