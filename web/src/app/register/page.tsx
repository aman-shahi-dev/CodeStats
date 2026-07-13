import { IconChartLine } from "@tabler/icons-react";
import { AuthForm } from "@/components/auth";

export const metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 radial-glow pointer-events-none" />
      <div className="scanline" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cf-blue/10 blur-[120px] rounded-full pointer-events-none" />

      <main className="w-full max-w-md z-20">
        <div className="flex flex-col items-center mb-8">
          <IconChartLine size={48} className="text-brand mb-3" />
          <h1 className="text-xl font-bold">CodeStats</h1>
          <p className="text-text-muted text-xs uppercase tracking-widest mt-1">Create Your Account</p>
        </div>

        <AuthForm mode="register" />
      </main>
    </div>
  );
}
