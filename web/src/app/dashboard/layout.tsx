"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { IconChartLine, IconLayoutDashboard, IconChartBar, IconSettings, IconRefresh, IconLogout } from "@tabler/icons-react";
import Link from "next/link";
import { Suspense, useState } from "react";
import { UserAvatar } from "@/components/ui/user-avatar";
import { WelcomeToast } from "@/components/dashboard/welcome-toast";

const navItems = [
  { icon: IconLayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: IconChartBar, label: "Analytics", href: "/dashboard/analytics" },
  { icon: IconSettings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetch("/api/cf/refresh", { method: "POST" });
    window.location.reload();
  };

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
    } catch (e) {
      // ignore JSON parse errors from beta
    }
    router.push("/?logout=true");
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex flex-col w-64 fixed left-0 top-0 h-full bg-surface-2/90 backdrop-blur-xl border-r border-border p-4 gap-4 z-40">
        <Link href="/" className="flex items-center gap-3 mb-6">
          <IconChartLine size={32} className="text-brand" />
          <span className="text-lg font-bold text-brand-light tracking-tight">CodeStats</span>
        </Link>

        <nav className="flex flex-col gap-1 flex-grow">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                  isActive
                    ? "bg-brand text-brand-dark font-semibold"
                    : "text-text-secondary hover:bg-surface-5/50"
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-border">
          <div className="flex items-center gap-3 p-2 mb-4">
            <UserAvatar name={session?.user?.name} image={session?.user?.image} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{session?.user?.name || "User"}</p>
              <p className="text-[10px] text-text-muted truncate">{session?.user?.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="w-full py-2 px-3 bg-brand text-brand-dark rounded-md text-xs font-medium flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-60"
            >
              <IconRefresh size={14} className={refreshing ? "animate-spin" : ""} />
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-2 px-3 bg-surface-5 hover:bg-destructive/20 hover:text-destructive text-text-secondary rounded-md text-xs font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <IconLogout size={14} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 md:ml-64 p-6 min-h-screen">{children}</main>

      <Suspense fallback={null}>
        <WelcomeToast />
      </Suspense>
    </div>
  );
}
