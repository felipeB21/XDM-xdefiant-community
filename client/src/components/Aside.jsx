"use client";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiMachineGunMagazine } from "react-icons/gi";
import { GiPistolGun } from "react-icons/gi";
import { FaPeopleGroup, FaUser } from "react-icons/fa6";
import LoadingIcon from "./LoadingIcon";

const links = [
  { name: "Weapons", href: "/weapons", icon: <GiPistolGun /> },
  { name: "Loadouts", href: "/loadouts", icon: <GiMachineGunMagazine /> },
  { name: "Factions", href: "/factions", icon: <FaPeopleGroup /> },
];

export default function Aside() {
  const { user, isAuthenticated, loading } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(!loading && isAuthenticated);
  }, [loading, isAuthenticated]);

  return (
    <aside className=" h-full static py-12 bg-neutral-900">
      <div className="flex flex-col justify-between items-center">
        <div className="flex flex-col gap-10">
          <Link className="flex flex-col text-2xl p-4 font-bold" href="/">
            XDMUNITY
            <span className="text-sm text-blue-300">XDefiant Community</span>
          </Link>
          <nav className="flex flex-col">
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    className="flex rounded hover:bg-neutral-800 items-center p-4 gap-4 hover:text-blue-400 duration-150"
                    href={link.href}
                  >
                    <div className="text-blue-400">{link.icon}</div>
                    <p className="text-lg">{link.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              {loading ? (
                <div>
                  <LoadingIcon />
                </div>
              ) : (
                <div>
                  {isAuthenticated && user ? (
                    <Link
                      className="flex rounded hover:bg-neutral-800 p-4 items-center gap-4 hover:text-blue-400 duration-150"
                      href={`/user/${user.username}`}
                    >
                      <div className="text-blue-400">
                        <FaUser />
                      </div>
                      <p className="text-lg">Profile</p>
                    </Link>
                  ) : (
                    <Link
                      className="flex rounded hover:bg-neutral-800 p-4 items-center gap-4  hover:text-blue-400 duration-150"
                      href="/signin"
                    >
                      <div className="text-blue-400">
                        <FaUser />
                      </div>
                      <p className="text-lg">Sign in</p>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
}
