import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import OAuthButtons from "../../components/ui/OAuthButtons";

export function LoginPage() {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    searchParams.get("error") === "oauth_failed"
      ? "OAuth sign-in failed. Please try again!"
      : ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="page-container flex items-center justify-center min-h-[80vh]">
      <div className="surface p-8 w-full max-w-sm flex flex-col gap-5">
        <div>
          <h2
            className="text-xl font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Welcome back
          </h2>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Sign in to your CodeStats account
          </p>
        </div>

        <OAuthButtons label="Sign in" />

        <div className="flex items-center gap-1">
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: "var(--border)" }}
          />
          <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            or continue with email
          </span>
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: "var(--border)" }}
          />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            label="Email"
            type="email"
            id="email"
            placeholder="johnsnow@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <p className="text-sm" style={{ color: "var(--danger)" }}>
              {error}
            </p>
          )}
          <Button type="submit" isLoading={isLoading} className="w-full mt-1">
            Sign In
          </Button>
        </form>

        <p
          className="text-sm text-center"
          style={{ color: "var(--text-secondary)" }}
        >
          No account?{" "}
          <Link
            to="/register"
            style={{ color: "var(--brand)" }}
            className="font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
