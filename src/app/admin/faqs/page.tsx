"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { AdminHeader } from "@/components/admin/admin-header";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { DataTable } from "@/components/admin/data-table";
import { FAQForm } from "@/components/admin/faq-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableCell } from "@/components/ui/table";

type Item = {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isPublished: boolean;
};

export default function AdminFaqsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [editing, setEditing] = useState<Item | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    const res = await fetch("/api/faqs?all=true");
    const json = await res.json();
    setItems(json.data || []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const save = async (values: Record<string, unknown>) => {
    setLoading(true);
    try {
      const isEdit = Boolean(editing);
      const res = await fetch(isEdit ? `/api/faqs/${editing?._id}` : "/api/faqs", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      toast.success(isEdit ? "FAQ updated." : "FAQ created.");
      setEditing(null);
      fetchItems();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save FAQ.");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (!json.success) return toast.error(json.message);
    toast.success("FAQ deleted.");
    fetchItems();
  };

  return (
    <div>
      <AdminHeader title="Manage FAQs" />
      <div className="grid gap-6 p-4 md:p-8 xl:grid-cols-[420px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>{editing ? "Edit FAQ" : "Create FAQ"}</CardTitle>
          </CardHeader>
          <CardContent>
            <FAQForm initialData={editing || undefined} loading={loading} onSubmit={save} />
            {editing ? (
              <Button variant="ghost" className="mt-3" onClick={() => setEditing(null)}>
                Cancel Edit
              </Button>
            ) : null}
          </CardContent>
        </Card>
        <DataTable
          headers={["Question", "Category", "Status", "Actions"]}
          rows={items}
          renderRow={(row) => (
            <>
              <TableCell className="max-w-[320px]">
                <p className="line-clamp-2 font-medium">{row.question}</p>
              </TableCell>
              <TableCell>{row.category}</TableCell>
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
