import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../../services/appwrite/appwrite";
import { useAuth } from "../../hooks/useAuth";
import client from "../../services/appwrite/appwrite";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");
    const secret = params.get("secret");

    if (!userId || !secret) {
      navigate("/login?error=oauth_failed", { replace: true });
    }

    account
      .createSession(userId, secret)
      .then(() => account.createJWT())
      .then(({ jwt }) => {
        localStorage.setItem("appwrite_jwt", jwt);
        client.setJWT(jwt);
        return account.get();
      })
      .then((user) => {
        setUser(user);
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.error("OAuth failed:", error);
        navigate("/login?error=oauth_failed", { replace: true });
      });
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="animate-pulse">Signing you in...</p>
    </div>
  );
}
