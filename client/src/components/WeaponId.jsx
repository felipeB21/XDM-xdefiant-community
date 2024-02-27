"use client";
import { useWeapon } from "@/app/context/WeaponContext";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LoadingIcon from "./LoadingIcon";
import Image from "next/image";

export default function WeaponId() {
  const { getWeaponById, weapon, errors } = useWeapon();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWeaponById(id).then(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingIcon />
      </div>
    );
  }

  if (!weapon) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        No weapon found...
      </div>
    );
  }
  return (
    <div className="min-h-screen py-16 px-32">
      <div>
        <h3 className="text-2xl font-bold mb-10">{weapon.type.name}</h3>
        <Image
          className="w-auto h-auto bg-black p-5 rounded-md"
          src={weapon.type.imageUrl}
          alt={weapon.type.name}
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
