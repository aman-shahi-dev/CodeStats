"use client";

import { useState, useEffect } from "react";
import { IconBrandCodepen, IconCode, IconTrophy, IconAlertTriangle, IconLoader2, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const platforms = [
  { name: "Codeforces", key: "cfHandle", icon: IconBrandCodepen, placeholder: "e.g. thebinarycoder", color: "text-cf-blue", bgColor: "bg-cf-blue/10" },
  { name: "LeetCode", key: "lcHandle", icon: IconCode, placeholder: "e.g. thebinarycoder", color: "text-lc-orange", bgColor: "bg-lc-orange/10" },
  { name: "AtCoder", key: "acHandle", icon: IconTrophy, placeholder: "e.g. thebinarycoder0", color: "text-ac-teal", bgColor: "bg-ac-teal/10" },
  { name: "CodeChef", key: "ccHandle", icon: IconBrandCodepen, placeholder: "e.g. thebinarycoder", color: "text-cc-brown", bgColor: "bg-cc-brown/10" },
];

export default function SettingsPage() {
  const router = useRouter();
  const [handles, setHandles] = useState({
    cfHandle: "", lcHandle: "", acHandle: "", ccHandle: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetch("/api/user/handles")
      .then((r) => r.json())
      .then((data) => {
        setHandles({
          cfHandle: data.cfHandle || "",
          lcHandle: data.lcHandle || "",
          acHandle: data.acHandle || "",
          ccHandle: data.ccHandle || "",
        });
      })
      .finally(() => setFetching(false));
  }, []);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/handles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(handles),
      });
      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "Failed to save handles.", "error");
      } else {
        showToast("Platform handles saved successfully!", "success");
      }
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch("/api/user/account", {
        method: "DELETE",
      });
      if (res.ok) {
        // Sign out without redirect to prevent beta JSON parse bug, then route to home
        try {
          await signOut({ redirect: false });
        } catch (e) {}
        window.location.href = "/";
      } else {
        showToast("Failed to delete account.", "error");
        setIsDeleting(false);
        setShowDeleteDialog(false);
      }
    } catch {
      showToast("Network error.", "error");
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Account Settings</h1>
        <p className="text-sm text-text-secondary">Manage your competitive programming profiles and preferences.</p>
      </div>

      <div className="flex flex-col gap-6 max-w-3xl">
        <section className="glass-card rounded-xl p-6">
          <h2 className="text-xs font-medium text-text-muted uppercase tracking-widest mb-6">Platform Usernames</h2>
          {fetching ? (
            <div className="flex items-center justify-center py-8">
              <IconLoader2 size={24} className="text-brand animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {platforms.map((p) => (
                <div key={p.name} className="flex items-center gap-4 p-4 rounded-lg bg-surface-1 border border-border/50">
                  <div className={`w-10 h-10 rounded-lg ${p.bgColor} flex items-center justify-center ${p.color}`}>
                    <p.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-text-secondary block mb-1">{p.name} Handle</label>
                    <input
                      className="w-full bg-transparent border-none p-0 font-mono text-sm outline-none placeholder:text-text-muted/40"
                      placeholder={p.placeholder}
                      value={handles[p.key as keyof typeof handles]}
                      onChange={(e) =>
                        setHandles((prev) => ({ ...prev, [p.key]: e.target.value }))
                      }
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={handleSave}
                disabled={loading}
                className="w-full mt-4 py-3 bg-brand text-brand-dark font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-brand/90 active:scale-[0.98] transition-all disabled:opacity-60"
              >
                {loading ? (
                  <><IconLoader2 size={18} className="animate-spin" /> Validating & Saving...</>
                ) : (
                  "Save Platform Handles"
                )}
              </button>
            </div>
          )}
        </section>

        {/* Danger Zone */}
        <section className="border border-danger/30 bg-danger/5 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-danger mb-1 flex items-center gap-2">
                <IconAlertTriangle size={20} /> Danger Zone
              </h2>
              <p className="text-sm text-text-secondary">Once you delete your account, there is no going back.</p>
            </div>
            <button 
              onClick={() => setShowDeleteDialog(true)}
              className="bg-danger hover:bg-danger/90 text-white px-6 py-3 rounded-md font-bold active:scale-95 transition-all whitespace-nowrap"
            >
              Delete Account
            </button>
          </div>
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card max-w-md w-full rounded-xl p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => !isDeleting && setShowDeleteDialog(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors disabled:opacity-50"
              disabled={isDeleting}
            >
              <IconX size={20} />
            </button>
            <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center mb-4">
              <IconAlertTriangle size={24} className="text-danger" />
            </div>
            <h2 className="text-xl font-bold mb-2">Delete Account?</h2>
            <p className="text-sm text-text-secondary mb-6">
              This action cannot be undone. All of your CodeStats settings, dashboard preferences, and linked platform data will be permanently wiped from our servers.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowDeleteDialog(false)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-md text-sm font-medium hover:bg-surface-5 text-text-secondary transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="px-4 py-2 rounded-md text-sm font-bold bg-danger text-white hover:bg-danger/90 flex items-center gap-2 disabled:opacity-60 transition-colors"
              >
                {isDeleting ? <><IconLoader2 size={16} className="animate-spin" /> Deleting...</> : "Yes, delete my account"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${toast ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}>
        {toast && (
          <div className={`glass px-6 py-4 rounded-xl flex items-center gap-3 border ${
            toast.type === "success" ? "border-green-500/30" : "border-danger/30"
          }`}>
            <span>{toast.type === "success" ? "✓" : "✗"}</span>
            <p className={`text-sm font-bold ${toast.type === "success" ? "text-green-400" : "text-danger"}`}>
              {toast.message}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
