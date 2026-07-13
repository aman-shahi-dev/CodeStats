"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { IconCheck } from "@tabler/icons-react";

export function LogoutToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchParams.get("logout") === "true") {
      // Instantly remove the query param from URL bar without a full navigation cycle
      window.history.replaceState(null, "", "/");
      
      // Delay to ensure hydration
      requestAnimationFrame(() => {
        setShow(true);
      });

      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-destructive/10 border border-destructive/20 text-destructive shadow-lg rounded-lg p-4 flex items-center gap-3 backdrop-blur-md">
        <div className="bg-destructive/20 p-1.5 rounded-full">
          <IconCheck size={18} className="text-destructive" />
        </div>
        <div>
          <h4 className="text-sm font-semibold">Logged out</h4>
          <p className="text-xs opacity-90">User logged out successfully.</p>
        </div>
      </div>
    </div>
  );
}
