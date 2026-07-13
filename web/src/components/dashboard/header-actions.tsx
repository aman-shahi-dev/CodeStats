"use client";

import { useState, useRef, useEffect } from "react";
import { IconBell, IconCheck } from "@tabler/icons-react";

export function HeaderActions() {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setShowNotifications(!showNotifications)}
        className="glass-card px-3 py-2 rounded-md hover:bg-surface-5 transition-colors relative"
      >
        <IconBell size={20} className="text-brand" />
        <span className="absolute top-2 right-3 w-2 h-2 bg-brand rounded-full"></span>
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-64 glass-card rounded-xl p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
              <IconCheck size={16} className="text-brand" />
            </div>
            <div>
              <h4 className="text-sm font-bold">You're all caught up!</h4>
              <p className="text-[10px] text-text-secondary">No new notifications.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
