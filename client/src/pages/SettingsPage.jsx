import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import { useTheme } from "../hooks/useTheme";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Section from "../components/ui/Section";
import PlatformField from "../components/ui/PlatformField";

export function SettingsPage() {
  const { user, logout } = useAuth();
  const { profile, isLoading, saveProfile, deleteProfile } = useProfile();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    codeforcesUsername: "",
    leetcodeUsername: "",
    atcoderUsername: "",
  });

  const [saveStatus, setSaveStatus] = useState("idle"); // idle, saving, saved, error => four values (default = idle)

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // once profile loads, populate the form
  useEffect(() => {
    if (profile) {
      setForm({
        codeforcesUsername: profile.codeforcesUsername ?? "",
        leetcodeUsername: profile.leetcodeUsername ?? "",
        atcoderUsername: profile.atcoderUsername ?? "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (saveStatus === "saved" || saveStatus === "error") setSaveStatus("idle");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveStatus("saving");
    try {
      await saveProfile(form);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } catch (error) {
      setSaveStatus("error");
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteProfile();
      await logout();
      navigate("/");
    } catch (error) {
      setIsDeleting(false);
      setDeleteConfirm(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="page-container max-w-2xl">
      <div className="mb-8">
        <h1
          className="text-2xl font-semibold tracking-tight mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          Settings
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Manage your account and linked platforms.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Profile Info */}
        <Section title="Profile" subtitle="Your accounts details from sign-up">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-base font-semibold shrink-0"
              style={{
                background: "color-mix(in srgb, var(--brand) 20%, transparent)",
                color: "var(--brand)",
              }}
            >
              {user?.name?.charAt(0).toUpperCase() ?? "?"}
            </div>
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {user?.name ?? "–"}
              </p>
              <p
                className="text-sm "
                style={{ color: "var(--text-secondary)" }}
              >
                {user?.email ?? "–"}
              </p>
            </div>
          </div>
        </Section>

        {/* Platform usernames */}
        <Section
          title="Platform username"
          subtitle="Link your competitive programming accounts to pull in your stats."
        >
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <PlatformField
              label="Codeforces"
              color="var(--cf-color)"
              name="codeforcesUsername"
              value={form.codeforcesUsername}
              onChange={handleChange}
              placeholder="e.g. Tourist"
            />
            <PlatformField
              label="LeetCode"
              color="var(--lc-color)"
              name="leetcodeUsername"
              value={form.leetcodeUsername}
              onChange={handleChange}
              placeholder="e.g. neal.wu"
            />
            <PlatformField
              label="AtCoder"
              color="var(--ac-color)"
              name="atcoderUsername"
              value={form.atcoderUsername}
              onChange={handleChange}
              placeholder="e.g. Petr"
            />

            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                className="btn-primary px-4 py-2 text-sm"
                disabled={saveStatus === "saving"}
              >
                {saveStatus === "saving" ? (
                  <span className="flex items-center gap-2">
                    <LoadingSpinner size="sm" /> Saving...
                  </span>
                ) : (
                  "Save changes"
                )}
              </button>

              {saveStatus === "saved" && (
                <span
                  className="text-sm font-medium flex items-center gap-1.5"
                  style={{ color: "var(--success)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8l3.5 3.5L13 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Saved
                </span>
              )}
              {saveStatus === "error" && (
                <span className="text-sm" style={{ color: "var(--danger)" }}>
                  Something went wrong. Try again.
                </span>
              )}
            </div>
          </form>
        </Section>

        {/* Appearance */}
        <Section
          title="Appearance"
          subtitle="Customise how CodeStats looks for you."
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Theme
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "var(--text-secondary)" }}
              >
                Currently using {theme === "dark" ? "dark" : "light"} mode.
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="btn-secondary px-4 py-2 text-sm flex items-center gap-2"
            >
              {theme === "dark" ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle
                      cx="8"
                      cy="8"
                      r="3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Switch to light
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13.5 9.5A5.5 5.5 0 016.5 2.5a5.5 5.5 0 100 11 5.5 5.5 0 007-4z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Switch to dark
                </>
              )}
            </button>
          </div>
        </Section>

        {/* Danger Zone */}
        <Section title="Danger zone" danger>
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Delete account
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "var(--text-secondary)" }}
              >
                Permanently delete your profile and all linked data.
              </p>
            </div>
            {!deleteConfirm ? (
              <button
                onClick={() => setDeleteConfirm(true)}
                className="btn-secondary px-4 py-2 text-sm"
                style={{ color: "var(--danger)", borderColor: "var(--danger)" }}
              >
                Delete account
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span
                  className="text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Are you sure?
                </span>
                <button
                  onClick={() => setDeleteConfirm(false)}
                  className="btn-secondary px-3 py-1.5 text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="btn-primary px-3 py-1.5 text-xs"
                  style={{ background: "var(--danger)" }}
                >
                  {isDeleting ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            )}
          </div>
        </Section>
      </div>
    </div>
  );
}
