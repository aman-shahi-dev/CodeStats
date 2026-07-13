"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { IconMail, IconLock, IconEye, IconEyeOff, IconTrendingUp, IconBrandGithub, IconBrandGoogle, IconBrandApple, IconUser } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AuthFormProps {
  mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const handleOAuth = (provider: string) => {
    signIn(provider, { callbackUrl: "/dashboard?welcome=true" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="glass rounded-xl p-8 md:p-10 relative overflow-hidden transition-all duration-500 hover:border-outline/50 border border-border">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <p className="text-text-secondary text-sm mt-1">
          {isLogin ? "Sign in to track your performance metrics" : "Start tracking your competitive programming journey"}
        </p>
      </div>

      {/* OAuth buttons — now functional */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { icon: IconBrandGithub, label: "GitHub", provider: "github" },
          { icon: IconBrandGoogle, label: "Google", provider: "google" },
          { icon: IconBrandApple, label: "Apple", provider: "apple" },
        ].map((p) => (
          <button
            key={p.label}
            onClick={() => handleOAuth(p.provider)}
            aria-label={`Sign in with ${p.label}`}
            className="flex items-center justify-center py-2.5 bg-surface-1 border border-border rounded-md hover:bg-surface-6 transition-colors group cursor-pointer"
          >
            <p.icon size={20} className="text-text-primary group-hover:text-brand transition-colors" />
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-text-muted uppercase tracking-widest">or email</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-secondary ml-1">FULL NAME</label>
            <div className="relative">
              <IconUser size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <Input className="pl-10 bg-surface-1 border-border input-glow" placeholder="John Doe" required />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-medium text-text-secondary ml-1">EMAIL</label>
          <div className="relative">
            <IconMail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input className="pl-10 bg-surface-1 border-border input-glow" placeholder="name@company.com" type="email" required />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-end mb-1">
            <label className="text-xs font-medium text-text-secondary ml-1">PASSWORD</label>
            {isLogin && (
              <Link href="/forgot-password" className="text-xs text-brand hover:text-brand-light transition-colors">
                Forgot?
              </Link>
            )}
          </div>
          <div className="relative">
            <IconLock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              className="pl-10 pr-12 bg-surface-1 border-border input-glow"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
            </button>
          </div>
        </div>

        {isLogin && (
          <div className="flex items-center gap-2 py-1">
            <input type="checkbox" id="remember" className="w-4 h-4 rounded border-border bg-surface-1 text-brand accent-brand" />
            <label htmlFor="remember" className="text-sm text-text-secondary">Stay signed in for 30 days</label>
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-brand text-brand-dark font-bold uppercase tracking-widest hover:bg-brand/90 active:scale-[0.98] transition-all mt-2"
        >
          {loading ? "Synchronizing..." : (
            <span className="flex items-center gap-2">
              {isLogin ? "Sign In to Dashboard" : "Create Account"}
              <IconTrendingUp size={18} />
            </span>
          )}
        </Button>
      </form>

      <div className="mt-6 pt-4 border-t border-border text-center">
        <p className="text-sm text-text-secondary">
          {isLogin ? "New to CodeStats?" : "Already have an account?"}{" "}
          <Link href={isLogin ? "/register" : "/login"} className="text-brand font-semibold hover:underline underline-offset-4">
            {isLogin ? "Create an account" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
}
