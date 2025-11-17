import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState();

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
  }, []); // This happens when the app first loads.
  // You check if localStorage has a token saved.
  // If yes, you put that token into state.
  // So when someone refreshes the page, they stay logged in.

  const login = (tokenValue) => {
    localStorage.setItem("token", tokenValue);
    setToken(tokenValue);
  }; // When someone logs in:
  // You save their token in localStorage so it's not forgotten.
  // You update the state so the app knows they're logged in right now.

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  }; // The token is deleted from the drawer (localStorage).
  // And from the state.
  // Now the app knows they're logged out.

  const value = { token, login, logout, isLoggedIn: !!token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
