"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  HomeIcon,
  GunsIcon,
  FactionIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  MessagesIcon,
  UsersIcon,
  LoadoutIcon,
  SignInIcon,
} from "@/components/icons/Icons";
import logo from "../../public/logo.webp";

const hubLinks = [
  { name: "Home", url: "/", icon: <HomeIcon /> },
  { name: "Weapons", url: "/weapons", icon: <GunsIcon /> },
  { name: "Factions", url: "/factions", icon: <FactionIcon /> },
  { name: "Loadouts", url: "/loadouts", icon: <LoadoutIcon /> },
];

const userLinks = [
  { name: "Posts", url: "/posts", icon: <MessagesIcon /> },
  { name: "Users", url: "/users", icon: <UsersIcon /> },
];

export default function Aside() {
  const pathname = usePathname();
  const [hubOpen, setHubOpen] = useState(true);
  const [userOpen, setUserOpen] = useState(true);

  const toggleHubMenu = () => {
    setHubOpen(!hubOpen);
  };

  const toggleUserMenu = () => {
    setUserOpen(!userOpen);
  };

  return (
    <aside className="bg-neutral-800 h-screen fixed left-0 px-10">
      <div className="flex items-center justify-center">
        <div className="flex flex-col justify-between items-center">
          <div className="flex flex-col gap-10 py-10">
            <div>
              <Link
                className="font-bold uppercase flex items-center gap-2"
                href={"/"}
              >
                <Image
                  className="w-auto h-auto"
                  src={logo}
                  alt="logo"
                  width={50}
                  height={50}
                  priority
                />
                <div>
                  <p className="text-xs">XDefiant loadout</p>
                  <h2 className="text-xl">XDMunity</h2>
                </div>
              </Link>
            </div>
            <nav>
              <button
                className="flex items-center gap-3 mb-4"
                onClick={toggleHubMenu}
              >
                <h4 className="font-bold text-lg">Hub</h4>
                {hubOpen ? <ArrowDownIcon /> : <ArrowUpIcon />}
              </button>
              {hubOpen && (
                <ul className="flex flex-col">
                  {hubLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        className="flex items-center gap-3 hover:bg-neutral-700/70 py-6 px-3 rounded"
                        href={link.url}
                      >
                        {link.icon}
                        <p
                          className={
                            pathname === link.url
                              ? "font-medium text-white"
                              : "text-neutral-300"
                          }
                        >
                          {link.name}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </nav>
            <nav>
              <button
                className="flex items-center gap-3 mb-4"
                onClick={toggleUserMenu}
              >
                <h4 className="font-bold text-lg">User</h4>
                {userOpen ? <ArrowDownIcon /> : <ArrowUpIcon />}
              </button>
              {userOpen && (
                <ul className="flex flex-col">
                  {userLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        className="flex items-center gap-3 hover:bg-neutral-700/70 py-6 px-3 rounded"
                        href={link.url}
                      >
                        {link.icon}
                        <p
                          className={
                            pathname === link.url
                              ? "font-medium text-white"
                              : "text-neutral-300"
                          }
                        >
                          {link.name}
                        </p>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/signin"
                      className="flex items-center w-full gap-3 hover:bg-neutral-700/70 py-6 px-3 rounded"
                    >
                      <SignInIcon />
                      <p className="text-neutral-300">Sign In</p>
                    </Link>
                  </li>
                </ul>
              )}
            </nav>
          </div>
          <p className="text-sm text-neutral-300">
            XDMunity all rights reserved
          </p>
        </div>
      </div>
    </aside>
  );
}
