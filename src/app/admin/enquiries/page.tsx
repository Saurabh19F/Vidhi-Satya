"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import { AdminHeader } from "@/components/admin/admin-header";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TableCell } from "@/components/ui/table";

type Enquiry = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  serviceInterested: string;
  department?: string;
  designation?: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
};

const statuses: Array<Enquiry["status"]> = ["new", "contacted", "closed"];

export default function AdminEnquiriesPage() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchItems = async (status?: string) => {
    const query = status && status !== "all" ? `?status=${status}` : "";
    const res = await fetch(`/api/enquiries${query}`);
    const json = await res.json();
    setItems(json.data || []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const updateStatus = async (id: string, status: Enquiry["status"]) => {
    const res = await fetch(`/api/enquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    const json = await res.json();
    if (!json.success) return toast.error(json.message);
    toast.success("Enquiry status updated.");
    fetchItems(statusFilter);
  };

  const remove = async (id: string) => {
    const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (!json.success) return toast.error(json.message);
    toast.success("Enquiry deleted.");
    fetchItems(statusFilter);
  };

  return (
    <div>
      <AdminHeader title="Manage Enquiries" />
      <div className="space-y-4 p-4 md:p-8">
        <div className="w-56">
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value);
              fetchItems(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DataTable
          headers={["Client", "Subject", "Status", "Date", "Actions"]}
          rows={items}
          renderRow={(row) => (
            <>
              <TableCell>
                <p className="font-medium">{row.name}</p>
                <p className="text-xs text-muted-foreground">{row.email}</p>
                <p className="text-xs text-muted-foreground">{row.phone}</p>
              </TableCell>
              <TableCell>
                <p>{row.subject}</p>
                <p className="text-xs text-muted-foreground">{row.serviceInterested}</p>
                {row.department ? <p className="text-xs text-muted-foreground">Department: {row.department}</p> : null}
                {row.designation ? <p className="text-xs text-muted-foreground">Designation: {row.designation}</p> : null}
              </TableCell>
              <TableCell>
                <Select value={row.status} onValueChange={(value) => updateStatus(row._id, value as Enquiry["status"])}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{format(new Date(row.createdAt), "PP")}</Badge>
              </TableCell>
              <TableCell>
                <ConfirmDialog
                  trigger={
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  }
                  onConfirm={() => remove(row._id)}
                />
              </TableCell>
            </>
          )}
        />
      </div>
    </div>
  );
}
