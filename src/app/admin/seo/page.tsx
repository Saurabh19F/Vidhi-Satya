"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { AdminHeader } from "@/components/admin/admin-header";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableCell } from "@/components/ui/table";
import { seoSchema } from "@/lib/validations";

type FormValues = z.infer<typeof seoSchema>;
type SEOItem = FormValues & { _id: string };

export default function AdminSeoPage() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<SEOItem[]>([]);
  const { register, handleSubmit, reset, setValue } = useForm<FormValues>({
    resolver: zodResolver(seoSchema),
    defaultValues: {
      page: "home",
      keywords: []
    }
  });

  const fetchItems = async () => {
    const res = await fetch("/api/seo");
    const json = await res.json();
    setItems(json.data || []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      toast.success("SEO entry saved.");
      fetchItems();
      reset({ page: "home", metaTitle: "", metaDescription: "", keywords: [], ogImage: "", canonicalUrl: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save SEO entry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminHeader title="Manage SEO" />
      <div className="grid gap-6 p-4 md:p-8 xl:grid-cols-[460px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>SEO Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label>Page</Label>
                <Input {...register("page")} placeholder="home, about, services..." />
              </div>
              <div>
                <Label>Meta Title</Label>
                <Input {...register("metaTitle")} />
              </div>
              <div>
                <Label>Meta Description</Label>
                <Input {...register("metaDescription")} />
              </div>
              <div>
                <Label>Keywords (comma separated)</Label>
                <Input onChange={(event) => setValue("keywords", event.target.value.split(",").map((i) => i.trim()).filter(Boolean))} />
              </div>
              <div>
                <Label>OG Image URL</Label>
                <Input {...register("ogImage")} />
              </div>
              <div>
                <Label>Canonical URL</Label>
                <Input {...register("canonicalUrl")} />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save SEO Entry"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <DataTable
          headers={["Page", "Meta Title", "Canonical"]}
          rows={items}
          emptyText="No SEO entries yet."
          renderRow={(row) => (
            <>
              <TableCell>{row.page}</TableCell>
              <TableCell>{row.metaTitle}</TableCell>
              <TableCell className="max-w-[280px] truncate">{row.canonicalUrl || "-"}</TableCell>
            </>
          )}
        />
      </div>
    </div>
  );
}
