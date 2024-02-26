"use client";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { name: "Scrims", href: "/scrims" },
  { name: "Teams", href: "/teams" },
  { name: "Players", href: "/players" },
  { name: "Tournaments", href: "/tournaments" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const { user, isAuthenticated, loading } = useAuth();
  const [isLoaded, setIsLoaded] = useState(!loading && isAuthenticated);

  useEffect(() => {
    setIsLoaded(!loading && isAuthenticated);
  }, [loading, isAuthenticated]);

  return (
    <header className="fixed top-0 w-full py-3 bg-neutral-950/60">
      <div className="w-[1200px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link className="text-3xl font-extrabold" href="/">
            XDM
          </Link>
          <nav>
            <ul className="flex items-center gap-5">
              {links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <p className="text-lg text-slate-300 hover:text-white duration-100">
                      {link.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          {isLoaded ? (
            isAuthenticated ? (
              <p className="py-2">
                <Link href={`/user/${user.id}`}>
                  <Image
                    className="rounded-full w-[45px] h-[45px] object-cover"
                    src={
                      user.avatarId
                        ? user.avatarId.imageUrl
                        : "/default-avatar.jpg"
                    }
                    alt={user.name}
                    width={50}
                    height={50}
                  />
                </Link>
              </p>
            ) : (
              <div className="py-[9.5px]">
                <Link href="/signin">
                  <button className="py-2 px-6 border font-medium rounded-md ">
                    Sign in
                  </button>
                </Link>
              </div>
            )
          ) : (
            <div className="py-[18.5px]">
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
