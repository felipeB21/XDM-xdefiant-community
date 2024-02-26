"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import {
  signUpRequest,
  signInRequest,
  verifyTokenRequest,
  getAvatarsRequest,
} from "@/api/auth";
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
  const [avatars, setAvatars] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (user) => {
    try {
      const res = await signUpRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  const signIn = async (user) => {
    try {
      const res = await signInRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  const getAvatars = async () => {
    try {
      const res = await getAvatarsRequest();
      setAvatars(res.data);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.errors);
    }
  };

  const signOut = () => {
    Cookies.remove("token"); // Limpiar la cookie del token al cerrar sesión
    setUser(null); // Limpiar los datos del usuario
    setIsAuthenticated(false); // Establecer isAuthenticated en false
    setLoading(false); // Establecer loading en false
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
        const response = await verifyTokenRequest(cookies.token);
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
        signUp,
        signIn,
        signOut, // Agregar la función de cierre de sesión al contexto
        getAvatars,
        avatars,
        user,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
