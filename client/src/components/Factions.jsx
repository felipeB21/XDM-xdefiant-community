"use client";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getFactions, useLikeFaction } from "@/api/factions";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

import { LikeIcon, DislikeIcon, LikedIcon, LoadingIcon } from "./icons/Icons";

export default function Factions() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { like, isLoading: isLiking, error: likeError } = useLikeFaction();
  const {
    dislike,
    isLoading: isDisliking,
    error: dislikeError,
  } = useLikeFaction();
  const [factionsLoaded, setFactionsLoaded] = useState(false);
  const {
    isLoading,
    data: factions,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["factions"],
    queryFn: getFactions,
    onSuccess: () => {
      setFactionsLoaded(true);
    },
  });
  const queryClient = useQueryClient();

  const handleLike = async (id) => {
    if (!isAuthenticated) {
      return router.push("/signin");
    }

    await like(id);
    await queryClient.invalidateQueries("factions");
  };

  const handleDislike = async (id) => {
    if (!isAuthenticated) {
      return router.push("/signin");
    }

    await dislike(id);
    await queryClient.invalidateQueries("factions");
  };

  if (isLoading || !factionsLoaded) {
    return <div className="mt-24 w-[1200px] mx-auto">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="mt-24 w-[1200px] mx-auto">Error: {error.message}</div>
    );
  }

  return (
    <div className="mt-24 w-[1200px] mx-auto">
      <div>
        <h4 className="text-3xl font-bold mb-4">XDefiant Factions</h4>
        <div className="flex gap-10 mt-14">
          {factions.map((faction) => (
            <div
              className="flex flex-col items-center bg-neutral-950 rounded-lg"
              key={faction._id}
            >
              <div>
                <Image
                  className="w-auto h-auto rounded-t-lg"
                  src={faction.imageUrl}
                  alt={faction.name}
                  width={200}
                  height={200}
                  priority
                />
                <div className="flex flex-col items-center py-5">
                  <h4 className="text-2xl font-bold pb-5">{faction.name}</h4>
                  <div className="flex items-center gap-10">
                    <div>
                      {isLiking ? (
                        <LoadingIcon />
                      ) : (
                        <>
                          {faction.usersLiked &&
                          faction.usersLiked.includes(user?.id) ? (
                            <button
                              disabled
                              className="bg-neutral-700 hover:bg-neutral-600 p-2 rounded-full"
                            >
                              <LikedIcon />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleLike(faction._id)}
                              className="bg-neutral-700 hover:bg-neutral-600 p-2 rounded-full"
                            >
                              <LikeIcon />
                            </button>
                          )}
                          <p className="py-2 text-sm text-center">
                            {faction.likes}
                          </p>
                        </>
                      )}
                    </div>
                    <div>
                      <button
                        onClick={() => handleDislike(faction._id)}
                        className="bg-neutral-700 hover:bg-neutral-600 p-2 rounded-full"
                      >
                        <DislikeIcon />
                      </button>
                      <p className="py-2 text-sm text-center">
                        {faction.dislikes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
