"use client";
import { createContext, useState, useContext } from "react";
import { signUp } from "@/api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signUpContext = async (userData) => {
    try {
      const response = await signUp(userData);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error in signUpContext:", error);
      setError(error.response?.data?.errors);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signUpContext,
        user,
        error,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
