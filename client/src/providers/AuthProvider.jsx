import { useState, useEffect } from "react";
import { account } from "../services/appwrite/appwrite";
import { AuthContext } from "../contexts/AuthContext";
import { OAuthProvider } from "appwrite";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (window.location.pathname === "/auth/callback") {
      setIsLoading(false);
      return;
    }
    account
      .get()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const register = async (name, email, password) => {
    try {
      const newUser = await account.create("unique()", email, password, name);
      await account.createEmailPasswordSession(email, password);
      setUser(newUser);
      return newUser;
    } catch (error) {
      console.error("Registration error ::", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const loggedIn = await account.get();
      setUser(loggedIn);
      return loggedIn;
    } catch (error) {
      console.error("Login error ::", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error("Logout error ::", error);
      throw error;
    }
  };

  const loginWithGoogle = () => {
    account.createOAuth2Token(
      OAuthProvider.Google,
      `${window.location.origin}/auth/callback`,
      `${window.location.origin}/login?error=oauth_failed`
    );
  };

  const loginWithGithub = () => {
    account.createOAuth2Token(
      OAuthProvider.Github,
      `${window.location.origin}/auth/callback`,
      `${window.location.origin}/login?error=oauth_failed`
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        register,
        login,
        logout,
        loginWithGoogle,
        loginWithGithub,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
