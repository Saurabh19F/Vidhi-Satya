"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type AdminHeaderProps = {
  title: string;
};

export function AdminHeader({ title }: AdminHeaderProps) {
  const router = useRouter();

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("Logged out successfully.");
      router.push("/admin/login");
      router.refresh();
    } catch {
      toast.error("Could not logout.");
    }
  };

  return (
    <header className="flex items-center justify-between bg-surface-high/80 px-4 py-4 backdrop-blur-xl md:px-8">
      <h1 className="font-[family-name:var(--font-newsreader)] text-3xl font-semibold">{title}</h1>
      <Button variant="outline" onClick={logout}>
        <LogOut className="mr-2 h-4 w-4" /> Logout
      </Button>
    </header>
  );
}
