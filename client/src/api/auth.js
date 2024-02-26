import axios from "./axios";

export const signUpRequest = async (user) => {
  const res = await axios.post("/signup", user);
  return res;
};

export const signInRequest = async (user) => {
  const res = await axios.post("/signin", user);
  return res;
};

export const verifyTokenRequest = async (token) => {
  const res = await axios.get("/verify", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const getAvatarsRequest = async () => {
  const res = await axios.get("/avatars");
  return res;
};
