"use client";
import axios from "axios";
import { useState } from "react";

const API_URL = "http://localhost:4000/api/v2";

const authApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const getFactions = async () => {
  const response = await authApi.get("/factions");
  return response.data;
};

export const likeFaction = async (id) => {
  const response = await authApi.put(`/factions/like/${id}`);
  return response.data;
};

export const dislikeFaction = async (id) => {
  const response = await authApi.put(`/factions/dislike/${id}`);
  return response.data;
};

export const useLikeFaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const like = async (id) => {
    try {
      setIsLoading(true);
      await likeFaction(id);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return { like, isLoading, error };
};

export const useDislikeFaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dislike = async (id) => {
    try {
      setIsLoading(true);
      await dislikeFaction(id);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return { dislike, isLoading, error };
};
