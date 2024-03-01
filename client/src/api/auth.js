import axios from "axios";

const API_URL = "http://localhost:4000/api/v2";

const authApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const getUsers = async () => {
  const response = await authApi.get("/users");
  return response.data;
};

export const getUser = async (username) => {
  const response = await authApi.get(`/user/${username}`);
  return response.data;
};

export const signIn = async (user) => {
  const response = await authApi.post("/signin", user);
  return response.data;
};

export const verifyToken = async () => {
  const response = await authApi.get("/verify");
  return response;
};

export const getAvatars = async () => {
  const response = await authApi.get("/avatars");
  return response.data;
};

export const signUp = async (user) => {
  const response = await authApi.post("/signup", user);
  return response.data;
};
