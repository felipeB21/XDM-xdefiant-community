"use client";
import { useQuery } from "react-query";
import { getWeapon } from "@/api/weapons";
import { useParams } from "next/navigation";
import Image from "next/image";
import ReturnButton from "./button/ReturnButton";

export default function WeaponId() {
  const { id } = useParams();
  const {
    isLoading,
    data: weapon,
    isError,
    error,
  } = useQuery(["weapon", id], () => getWeapon(id));

  if (isLoading) {
    return <div className="mt-24 w-[1200px] mx-auto">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="mt-24 w-[1200px] mx-auto">Error: {error.message}</div>
    );
  }

  if (!weapon) {
    return <div className="mt-24 w-[1200px] mx-auto">No data</div>;
  }
  return (
    <div className="mt-24 w-[1200px] mx-auto">
      <ReturnButton path="/weapons" />
      <div>
        <h2 className="text-3xl font-bold mb-4">{weapon.type.name}</h2>
        <Image
          className="w-auto h-auto mt-6 bg-black p-6 rounded-lg"
          src={weapon.type.imageUrl}
          alt={weapon.type.name}
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
