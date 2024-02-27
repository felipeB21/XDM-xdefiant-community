"use client";
import Weapons from "@/components/Weapons";
import React from "react";
import { WeaponProvider } from "../context/WeaponContext";

export default function page() {
  return (
    <WeaponProvider>
      <Weapons />
    </WeaponProvider>
  );
}
