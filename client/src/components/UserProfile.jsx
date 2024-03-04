"use client";
import React from "react";
import { useQuery } from "react-query";
import { getUser } from "@/api/auth";
import { useParams } from "next/navigation";
import Image from "next/image";
import { CalenderIcon } from "./icons/Icons";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

export default function UserProfile() {
  const { username } = useParams();
  if (!username) {
    return <div>Loading...</div>;
  }

  const { user: authUser } = useAuth();

  const {
    isLoading,
    data: user,
    isError,
    error,
  } = useQuery(["user", username], () => getUser(username), {});

  if (isLoading)
    return <div className="mt-24 w-[1200px] mx-auto">Loading...</div>;
  if (isError)
    return (
      <div className="mt-24 w-[1200px] mx-auto">Error: {error.message}</div>
    );

  if (!user) return <div className="mt-24 w-[1200px] mx-auto">No data</div>;
  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="mt-24 w-[1200px] mx-auto">
        <div className="flex gap-4">
          <Image
            className="w-[150px] h-[150px] object-cover rounded-full"
            src={user.avatarId.imageUrl}
            alt="avatar"
            width={150}
            height={150}
            priority
          />
          <div className="my-3">
            <h4 className="text-xl font-bold">{user.name}</h4>
            <p className="text-sm text-neutral-300">@{user.username}</p>
            <div className="mt-3 flex items-center gap-2">
              <CalenderIcon />
              <p className="text-sm text-neutral-100">
                Joined at{" "}
                {user.createdAt.split("T")[0].split("-").reverse().join("/")}
              </p>
            </div>
          </div>
        </div>
        <div>
          {authUser?.username === user.username ? (
            <Link href={`/users/${user.username}/edit`} className="btn-form">
              Edit Profile
            </Link>
          ) : (
            <button className="btn-form">Follow</button>
          )}
        </div>
      </div>
    </div>
  );
}
