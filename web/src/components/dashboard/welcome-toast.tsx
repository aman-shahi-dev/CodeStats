"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { IconCircleCheck } from "@tabler/icons-react";

export function WelcomeToast() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchParams.get("welcome") === "true") {
      setMounted(true);
      // Instantly remove the query parameter from the URL bar without a full navigation cycle
      window.history.replaceState(null, "", "/dashboard");

      // Slide in after a tiny delay (so transition plays)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });

      // Slide out after 3 seconds
      timerRef.current = setTimeout(() => {
        setVisible(false);
        // Remove from DOM after exit animation
        setTimeout(() => setMounted(false), 500);
      }, 3000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed top-20 right-6 z-50 transition-all duration-500 ease-out ${
        visible
          ? "translate-x-0 opacity-100"
          : "translate-x-[120%] opacity-0"
      }`}
    >
      <div className="glass border-green-500/30 rounded-xl px-6 py-4 flex items-center gap-4 shadow-2xl shadow-green-500/10">
        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
          <IconCircleCheck size={24} className="text-green-400" />
        </div>
        <div>
          <p className="text-green-400 font-semibold text-sm">Login Successful!</p>
          <p className="text-text-muted text-xs mt-0.5">Welcome back to CodeStats</p>
        </div>
      </div>
    </div>
  );
}
