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
import { Textarea } from "@/components/ui/textarea";
import { aboutSchema } from "@/lib/validations";

type FormValues = z.infer<typeof aboutSchema>;

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, watch, reset } = useForm<FormValues>({
    resolver: zodResolver(aboutSchema)
  });

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((json) => {
        if (json.data) {
          reset(json.data);
        }
      });
  }, [reset]);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      toast.success("About content saved.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save about content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminHeader title="Manage About" />
      <div className="p-4 md:p-8">
        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle>About Content</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label>Heading</Label>
                <Input {...register("heading")} />
              </div>
              <div>
                <Label>Subheading</Label>
                <Input {...register("subheading")} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea rows={6} {...register("description")} />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label>Vision</Label>
                  <Textarea rows={4} {...register("vision")} />
                </div>
                <div>
                  <Label>Mission</Label>
                  <Textarea rows={4} {...register("mission")} />
                </div>
                <div>
                  <Label>Philosophy</Label>
                  <Textarea rows={4} {...register("philosophy")} />
                </div>
              </div>
              <ImageUploadField value={watch("imageUrl")} onChange={(url) => setValue("imageUrl", url)} />
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save About Content"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
