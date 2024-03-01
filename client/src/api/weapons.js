import axios from "axios";

const API_URL = "http://localhost:4000/api/v2";

const authApi = axios.create({
  baseURL: API_URL,
});

export const getWeapons = async () => {
  const response = await authApi.get("/weapons");
  return response.data;
};

export const getWeapon = async (id) => {
  const response = await authApi.get(`/weapon/${id}`);
  return response.data;
};
