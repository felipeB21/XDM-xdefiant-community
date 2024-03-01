"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { signUp, signIn, verifyToken } from "@/api/auth";
import Cookies from "js-cookie";

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
  const [loading, setLoading] = useState(true);

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

  const signInContext = async (userData) => {
    try {
      const response = await signIn(userData);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error in signInContext:", error);
      setError(error.response?.data?.errors);
    }
  };

  useEffect(() => {
    async function checkAuth() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const response = await verifyToken(cookies.token);
        if (!response.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUpContext,
        signInContext,
        loading,
        user,
        error,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
