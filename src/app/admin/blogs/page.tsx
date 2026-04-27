"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { AdminHeader } from "@/components/admin/admin-header";
import { BlogForm } from "@/components/admin/blog-form";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableCell } from "@/components/ui/table";

type BlogItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  tags: string[];
  isPublished: boolean;
  publishedAt: string | Date;
  seoTitle: string;
  seoDescription: string;
};

export default function AdminBlogsPage() {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [editing, setEditing] = useState<BlogItem | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    const res = await fetch("/api/blogs?all=true");
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
      const res = await fetch(isEdit ? `/api/blogs/${editing?._id}` : "/api/blogs", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      toast.success(isEdit ? "Blog updated." : "Blog created.");
      setEditing(null);
      fetchItems();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save blog.");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (!json.success) return toast.error(json.message);
    toast.success("Blog deleted.");
    fetchItems();
  };

  return (
    <div>
      <AdminHeader title="Manage Blogs" />
      <div className="grid gap-6 p-4 md:p-8 xl:grid-cols-[500px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>{editing ? "Edit Blog" : "Create Blog"}</CardTitle>
          </CardHeader>
          <CardContent>
            <BlogForm initialData={editing || undefined} loading={loading} onSubmit={save} />
            {editing ? (
              <Button variant="ghost" className="mt-3" onClick={() => setEditing(null)}>
                Cancel Edit
              </Button>
            ) : null}
          </CardContent>
        </Card>
        <DataTable
          headers={["Title", "Author", "Status", "Actions"]}
          rows={items}
          renderRow={(row) => (
            <>
              <TableCell>
                <p className="font-medium">{row.title}</p>
                <p className="text-xs text-muted-foreground">{row.slug}</p>
              </TableCell>
              <TableCell>{row.author}</TableCell>
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
          emptyText="No blog posts yet."
        />
      </div>
    </div>
  );
}
