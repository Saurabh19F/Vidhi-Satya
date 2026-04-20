"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

import { AdminHeader } from "@/components/admin/admin-header";
import { DashboardCard } from "@/components/admin/dashboard-card";
import { DataTable } from "@/components/admin/data-table";
import { TableCell } from "@/components/ui/table";

type DashboardState = {
  enquiries: number;
  services: number;
  blogs: number;
  recentEnquiries: Array<{
    _id: string;
    name: string;
    email: string;
    status: string;
    createdAt: string;
  }>;
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardState>({
    enquiries: 0,
    services: 0,
    blogs: 0,
    recentEnquiries: []
  });

  useEffect(() => {
    async function fetchAll() {
      const [enquiriesRes, servicesRes, blogsRes] = await Promise.all([
        fetch("/api/enquiries"),
        fetch("/api/services?all=true"),
        fetch("/api/blogs?all=true")
      ]);
      const [enquiriesJson, servicesJson, blogsJson] = await Promise.all([
        enquiriesRes.json(),
        servicesRes.json(),
        blogsRes.json()
      ]);

      const enquiries = enquiriesJson.data || [];
      setData({
        enquiries: enquiries.length,
        services: (servicesJson.data || []).length,
        blogs: (blogsJson.data || []).length,
        recentEnquiries: enquiries.slice(0, 5)
      });
    }
    fetchAll();
  }, []);

  return (
    <div>
      <AdminHeader title="Dashboard" />
      <div className="space-y-8 p-4 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <DashboardCard label="Total Enquiries" value={data.enquiries} />
          <DashboardCard label="Total Services" value={data.services} />
          <DashboardCard label="Total Blog Posts" value={data.blogs} />
        </div>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Recent Enquiries</h2>
          <DataTable
            headers={["Name", "Email", "Status", "Date"]}
            rows={data.recentEnquiries}
            renderRow={(row) => (
              <>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell className="capitalize">{row.status}</TableCell>
                <TableCell>{format(new Date(row.createdAt), "PPp")}</TableCell>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}
