import { useContext, useState, useEffect } from "react";
import { account } from "../services/appwrite/appwrite";
import { AuthContext } from "../contexts/AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // true until first session check

  // check for an existing session on mount
  useEffect(() => {
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

  return (
    <AuthContext.Provider value={{ user, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
