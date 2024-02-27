"use client";
import WeaponId from "@/components/WeaponId";
import React from "react";
import { WeaponProvider } from "@/app/context/WeaponContext";

export default function page() {
  return (
    <WeaponProvider>
      <WeaponId />
    </WeaponProvider>
  );
}
