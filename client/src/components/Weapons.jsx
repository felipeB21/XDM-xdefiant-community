"use client";
import { useQuery } from "react-query";
import { getWeapons } from "@/api/weapons";
import Image from "next/image";
import Link from "next/link";

export default function Weapons() {
  const {
    isLoading,
    data: weapons,
    isError,
    error,
  } = useQuery({
    queryKey: ["weapons"],
    queryFn: getWeapons,
  });

  if (isLoading) {
    return <div className="mt-24 w-[1200px] mx-auto">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="mt-24 w-[1200px] mx-auto">Error: {error.message}</div>
    );
  }

  if (!weapons || weapons.length === 0) {
    return <div className="mt-24 w-[1200px] mx-auto">No data</div>;
  }

  return (
    <div className="mt-24 w-[1200px] mx-auto">
      <div>
        <h4 className="text-3xl font-bold mb-4">XDefiant Weapons</h4>
        {weapons.map((weapon) => (
          <div key={weapon._id}>
            <h4 className="text-2xl font-bold my-8">{weapon.class}</h4>
            <div className="flex flex-grow justify-between">
              {weapon.types.map((type) => (
                <Link href={`/weapons/${type._id}`} key={type._id}>
                  <h4 className="absolute z-20 bg-sky-500 font-bold py-2 px-5 rounded-tl-lg rounded-br-lg">
                    {type.name}
                  </h4>
                  <Image
                    className="bg-black rounded-lg px-4 w-[220px] h-[200px] object-contain relative shadow-xl border-2 border-sky-500"
                    src={type.imageUrl}
                    alt={type.name}
                    width={200}
                    height={200}
                    priority
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
