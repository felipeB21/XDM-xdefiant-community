import axios from "axios";

const API_URL = "http://localhost:4000/api/v2";

const authApi = axios.create({
  baseURL: API_URL,
});

export const getUsers = async () => {
  const response = await authApi.get("/users");
  return response.data;
};

export const signIn = async (user) => {
  const response = await authApi.post("/signin", user, {
    withCredentials: true,
  });
  return response.data;
};

export const signUp = async (user) => {
  const response = await authApi.post("/signup", user, {
    withCredentials: true,
  });
  return response.data;
};
