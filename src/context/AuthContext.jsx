import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));

    setLoading(false); // localStorage check done
  }, []); // This happens when the app first loads.
  // You check if localStorage has a token saved.
  // If yes, you put that token into state.
  // So when someone refreshes the page, they stay logged in.

  const login = (tokenValue, email) => {
    const userData = { email };

    localStorage.setItem("token", tokenValue);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(tokenValue);
    setUser(userData);
  }; // When someone logs in:
  // You save their token in localStorage so it's not forgotten.
  // You update the state so the app knows they're logged in right now.

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }; // The token is deleted from the drawer (localStorage).
  // And from the state.
  // Now the app knows they're logged out.

  const value = { token, user, login, logout, isLoggedIn: !!token, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
