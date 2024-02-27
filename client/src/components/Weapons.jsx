"use client";
import React, { useEffect, useState } from "react";
import { useWeapon } from "@/app/context/WeaponContext";
import Image from "next/image";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import Link from "next/link";

const SkeletonLoader = () => (
  <div className="min-h-screen py-16 px-32">
    <div className="grid grid-cols-4 gap-4 mt-16">
      {[1, 2, 3, 4].map((index) => (
        <div key={index} className="relative animate-pulse">
          <div className="bg-gray-200 p-2 rounded-md w-full aspect-w-16 aspect-h-9">
            <div className="animate-pulse bg-gradient-to-b from-gray-200 to-gray-300 w-full h-[100px] rounded-md"></div>
          </div>
          <h2 className="absolute z-20 bg-neutral-900/60 p-2 rounded-bl-md rounded-tr-md bottom-0 left-0 w-full text-center">
            &nbsp;
          </h2>
        </div>
      ))}
    </div>
  </div>
);

export default function Weapons() {
  const { weapons, getWeapons, loading } = useWeapon();
  const [openWeapons, setOpenWeapons] = useState({});

  useEffect(() => {
    getWeapons();
  }, []);

  useEffect(() => {
    const initialOpenState = weapons.reduce((acc, weapon) => {
      acc[weapon._id] = true;
      return acc;
    }, {});
    setOpenWeapons(initialOpenState);
  }, [weapons]);

  if (loading) {
    return <SkeletonLoader />;
  }

  const toggleContentVisibility = (weaponId) => {
    setOpenWeapons((prevOpenWeapons) => ({
      ...prevOpenWeapons,
      [weaponId]: !prevOpenWeapons[weaponId],
    }));
  };
  return (
    <div className="min-h-screen py-16 px-32">
      <div>
        {weapons.map((weapon, index) => (
          <div key={index}>
            <div
              className="flex items-center gap-3 text-xl cursor-pointer w-max"
              onClick={() => toggleContentVisibility(weapon._id)}
            >
              <h3 className="font-bold my-4">{weapon.class}</h3>
              {openWeapons[weapon._id] ? (
                <RiArrowDownSLine />
              ) : (
                <RiArrowUpSLine />
              )}
            </div>
            {openWeapons[weapon._id] && (
              <div className="grid grid-cols-4 mt-1">
                {weapon.types.map((type) => (
                  <div key={type._id} className="relative">
                    <Link href={`/weapons/${type._id}`}>
                      <Image
                        className="bg-black p-2 rounded-md w-[220px] object-contain h-[120px] relative"
                        src={type.imageUrl}
                        width={220}
                        height={220}
                        alt={type.name}
                        priority
                      />
                      <h2 className="absolute z-20 bg-neutral-900/60 p-2 rounded-bl-md rounded-tr-md bottom-0 left-0">
                        {type.name}
                      </h2>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
