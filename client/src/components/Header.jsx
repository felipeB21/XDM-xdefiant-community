"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

import {
  HomeIcon,
  GunsIcon,
  FactionIcon,
  MessagesIcon,
  UsersIcon,
  LoadoutIcon,
  SignInIcon,
  LoadingIcon,
} from "@/components/icons/Icons";
import logo from "../../public/logo.webp";

const links = [
  { name: "Home", url: "/" },
  { name: "Weapons", url: "/weapons" },
  { name: "Factions", url: "/factions" },
  { name: "Loadouts", url: "/loadouts" },
  { name: "Users", url: "/users" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, isAuthenticated, updateUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      updateUser();
      router.asPath;
    }
  }, [isAuthenticated]);

  return (
    <header className="bg-neutral-800 py-2 fixed top-0 w-full">
      <div className="w-[1200px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link className="flex items-center gap-3" href={"/"}>
            <Image
              className="w-auto h-auto"
              src={logo}
              alt="logo"
              width={40}
              height={40}
              priority
            />
            <div className="uppercase">
              <p className="text-sm">XDefiant loadouts</p>
              <h3 className="font-bold text-xl">XDMunity</h3>
            </div>
          </Link>
          <nav>
            <ul className="flex items-center gap-8">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className={`flex items-center gap-2 hover:bg-neutral-600/70 py-1 px-2 rounded-full ${
                      pathname === link.url ? "font-medium" : "text-neutral-300"
                    }`}
                  >
                    <p className="text-sm">{link.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {loading ? (
          <LoadingIcon />
        ) : (
          <>
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <Link href={`/users/${user.username}`}>
                  <Image
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    src={user.avatarId.imageUrl}
                    alt={user.name}
                    width={60}
                    height={60}
                  />
                </Link>
              </div>
            ) : (
              <Link
                className="flex items-center gap-3 border border-neutral-500 py-2 px-4 hover:bg-neutral-950 duration-150 rounded-md"
                href={"/signin"}
              >
                <SignInIcon />
                <p className="text-sm">Sign In</p>
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}
