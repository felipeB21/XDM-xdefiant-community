import axios from "./axios";

export const getWeaponsRequest = async () => {
  const res = await axios.get("/weapons");
  return res;
};

export const getWeaponByIdRequest = async (id) => {
  const res = await axios.get(`/weapon/${id}`);
  return res;
};

export const postWeaponRequest = async (weapon) => {
  const res = await axios.post("/weapons", weapon);
  return res;
};
