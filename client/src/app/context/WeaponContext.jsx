import React, { createContext, useState, useContext } from "react";
import { getWeaponsRequest, getWeaponByIdRequest } from "@/api/weapons";

export const WeaponContext = createContext();

export const useWeapon = () => {
  const context = useContext(WeaponContext);
  if (!context) {
    throw new Error("useWeapon must be used within an WeaponProvider");
  }
  return context;
};

export const WeaponProvider = ({ children }) => {
  const [weapons, setWeapons] = useState([]);
  const [errors, setErrors] = useState(null);
  const [weapon, setWeapon] = useState(null);
  const [loading, setLoading] = useState(true);

  const getWeapons = async () => {
    try {
      setLoading(true);
      const res = await getWeaponsRequest();
      setWeapons(res.data);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.errors);
    } finally {
      setLoading(false);
    }
  };

  const getWeaponById = async (id) => {
    try {
      setLoading(true);
      const res = await getWeaponByIdRequest(id);
      setWeapon(res.data);
    } catch (error) {
      setErrors(error.response.data.errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeaponContext.Provider
      value={{ weapons, getWeapons, getWeaponById, weapon, errors, loading }}
    >
      {children}
    </WeaponContext.Provider>
  );
};
