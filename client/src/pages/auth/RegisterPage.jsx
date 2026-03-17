import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import OAuthButtons from "../../components/ui/OAuthButtons";

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    searchParams.get("error") === "oauth_failed"
      ? "OAuth sign-up failed. Please try again!"
      : ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.message || "Couldn't create an account. Please try once again"
      );
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
            Create your account
          </h2>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Start tracking your coding stats today
          </p>
        </div>

        <OAuthButtons label="Sign up" />

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
            label="Name"
            type="text"
            id="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
          {error && (
            <p className="text-sm" style={{ color: "var(--danger)" }}>
              {error}
            </p>
          )}
          <Button type="submit" isLoading={isLoading} className="w-full mt-1">
            Create account
          </Button>
        </form>
        <p
          className="text-sm text-center"
          style={{ color: "var(--text-secondary)" }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "var(--brand)" }}
            className="font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
