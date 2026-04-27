import { LoginForm } from "@/components/forms/login-form";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary via-slate-900 to-secondary p-4">
      <LoginForm />
    </div>
  );
}
