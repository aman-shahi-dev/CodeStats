import { IconChartLine } from "@tabler/icons-react";
import { AuthForm } from "@/components/auth";

export const metadata = { title: "Sign In" };

export default function LoginPage() {
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
          <p className="text-text-muted text-xs uppercase tracking-widest mt-1">Authentication Portal</p>
        </div>

        <AuthForm mode="login" />

        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="flex items-center gap-2 text-xs text-text-muted/60">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            API STATUS: NOMINAL
          </div>
          <div className="h-3 w-px bg-border" />
          <span className="text-xs text-text-muted/60 uppercase">v2.4.12-PRO</span>
        </div>
      </main>
    </div>
  );
}
