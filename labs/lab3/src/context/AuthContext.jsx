// src/context/AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { authReducer, authInitialState } from "../reducers/authReducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState, () => {
    // Load state từ localStorage nếu có
    const saved = localStorage.getItem("auth");
    return saved
      ? { ...authInitialState, ...JSON.parse(saved) }
      : authInitialState;
  });

  // Khi state thay đổi, lưu vào localStorage
  useEffect(() => {
    if (state.isAuthenticated) {
      localStorage.setItem("auth", JSON.stringify(state));
    } else {
      localStorage.removeItem("auth");
    }
  }, [state]);

  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook dễ dùng
export const useAuth = () => useContext(AuthContext);
