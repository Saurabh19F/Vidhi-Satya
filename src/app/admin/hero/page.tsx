"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { AdminHeader } from "@/components/admin/admin-header";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { DataTable } from "@/components/admin/data-table";
import { HeroForm } from "@/components/admin/hero-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableCell } from "@/components/ui/table";

type HeroItem = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  order: number;
  isPublished: boolean;
};

export default function AdminHeroPage() {
  const [items, setItems] = useState<HeroItem[]>([]);
  const [editing, setEditing] = useState<HeroItem | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    const res = await fetch("/api/hero?all=true");
    const data = await res.json();
    setItems(data.data || []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const save = async (values: Record<string, unknown>) => {
    setLoading(true);
    try {
      const isEditing = Boolean(editing);
      const url = isEditing ? `/api/hero/${editing?._id}` : "/api/hero";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      toast.success(isEditing ? "Hero slide updated." : "Hero slide created.");
      setEditing(null);
      fetchItems();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save hero slide.");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    const res = await fetch(`/api/hero/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (!json.success) {
      toast.error(json.message);
      return;
    }
    toast.success("Hero slide deleted.");
    fetchItems();
  };

  return (
    <div>
      <AdminHeader title="Manage Hero" />
      <div className="grid gap-6 p-4 md:p-8 xl:grid-cols-[420px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>{editing ? "Edit Hero Slide" : "Add Hero Slide"}</CardTitle>
          </CardHeader>
          <CardContent>
            <HeroForm initialData={editing || undefined} loading={loading} onSubmit={save} />
            {editing ? (
              <Button variant="ghost" className="mt-3" onClick={() => setEditing(null)}>
                Cancel Edit
              </Button>
            ) : null}
          </CardContent>
        </Card>
        <DataTable
          headers={["Title", "Order", "Status", "Actions"]}
          rows={items}
          emptyText="No hero slides yet."
          renderRow={(row) => (
            <>
              <TableCell>
                <p className="font-medium">{row.title}</p>
                <p className="text-xs text-muted-foreground">{row.subtitle}</p>
              </TableCell>
              <TableCell>{row.order}</TableCell>
              <TableCell>
                <Badge variant={row.isPublished ? "accent" : "outline"}>{row.isPublished ? "Published" : "Draft"}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditing(row)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <ConfirmDialog
                    trigger={
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    }
                    onConfirm={() => remove(row._id)}
                  />
                </div>
              </TableCell>
            </>
          )}
        />
      </div>
    </div>
  );
}
