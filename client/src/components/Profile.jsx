"use client";
import { useAuth } from "@/app/context/AuthContext";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import LoadingIcon from "./LoadingIcon";
import Link from "next/link";

export default function Profile() {
  const { getUser, signOut, profile, loading, user } = useAuth();
  const router = useRouter();
  const { username } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (username && !loading) {
      getUser(username);
    }
  }, [username, loading, getUser]);

  useEffect(() => {
    if (!loading && profile) {
      setIsLoaded(true);
    }
  }, [profile, loading]);

  if (loading || !isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingIcon />
      </div>
    );
  }
  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h4 className="text-xl font-bold">We're sorry!</h4>
        <p className="text-lg">
          We couldn't find the user,{" "}
          <Link className="text-blue-400 hover:underline" href="/">
            go back to XDMUNITY
          </Link>
        </p>
      </div>
    );
  }

  const handleSignOut = () => {
    signOut();
    router.push("/signin");
  };
  return (
    <div className="min-h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="flex flex-col items-center gap-5 p-10">
        <Image
          className="rounded-full w-[200px] h-[200px] object-cover"
          src={profile?.avatarId.imageUrl}
          alt="Avatar"
          width={200}
          height={200}
          priority
        />
        <div className="flex flex-col items-center">
          <h4 className="text-3xl font-medium">{profile?.name}</h4>
          <p className="py-1 text-neutral-300">@{profile?.username}</p>
        </div>
        {user?.id === profile?.id && (
          <button
            className="py-2 px-4 bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer z-20 rounded"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
}
