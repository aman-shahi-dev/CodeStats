import { APP_NAME } from "../constants/constants";
import { useAuth } from "../hooks/useAuth";
import ThemeToggle from "./ui/ThemeToggle";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../components/ui/Logo";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors duration-200 px-4 py-2 rounded-md ${
    isActive
      ? "text-[var(--text-inverse)] bg-[var(--brand-subtle)]"
      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)]"
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <Link
          to={user ? "/dashboard" : "/"}
          className="flex items-center gap-2"
        >
          <Logo />
          <span
            className="font-semibold text-base"
            style={{ color: "var(--text-primary)" }}
          >
            {APP_NAME}
          </span>
        </Link>

        {/* Right: nav + theme toggle */}
        <div className="flex items-center gap-1">
          {user ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/settings" className={navLinkClass}>
                Settings
              </NavLink>
              <div
                className="w-px h-5 mx-1"
                style={{ backgroundColor: "var(--border)" }}
              />
              <button
                onClick={handleLogout}
                className="btn-ghost bg-red-500 text-white hover:bg-red-700 text-sm px-3 py-1.5"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Sign In
              </NavLink>
              <Link to="/register" className="btn-primary text-sm ml-1">
                Get Started
              </Link>
            </>
          )}
          <ThemeToggle className="ml-1" />
        </div>
      </div>
    </nav>
  );
}
