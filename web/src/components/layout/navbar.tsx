"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IconChartLine, IconMenu2, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Platform", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Community", href: "/community" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 h-16 flex items-center justify-between px-6 md:px-8 border-b transition-all duration-300 ${
        scrolled
          ? "bg-surface-0/95 backdrop-blur-xl border-border"
          : "bg-surface-0/80 backdrop-blur-xl border-transparent"
      }`}
    >
      <Link href="/" className="flex items-center gap-2">
        <IconChartLine size={28} className="text-brand" />
        <span className="text-xl font-bold text-gradient">CodeStats</span>
      </Link>

      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive
                  ? "text-brand border-b-2 border-brand pb-1"
                  : "text-text-secondary hover:text-brand"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="hidden md:flex items-center gap-3">
        {session ? (
          <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <span className="text-sm text-text-secondary">{session.user?.name}</span>
            <UserAvatar name={session.user?.name} image={session.user?.image} size={32} />
          </Link>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost" className="text-text-secondary hover:text-brand">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-brand text-brand-dark font-bold hover:bg-brand/90">Get Started</Button>
            </Link>
          </>
        )}
      </div>

      <button className="md:hidden text-text-primary" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </button>

      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-surface-1 border-b border-border p-6 flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm ${pathname === link.href ? "text-brand font-semibold" : "text-text-secondary hover:text-brand"}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-4 border-t border-border">
            {session ? (
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-brand text-brand-dark font-bold">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full">Sign In</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-brand text-brand-dark font-bold">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
