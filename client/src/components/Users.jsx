"use client";
import { useQuery } from "react-query";
import { getUsers } from "@/api/auth";
import Image from "next/image";
export default function Users() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) {
    return (
      <div className="absolute w-[72vw] mx-auto left-96 mt-16">Loading...</div>
    );
  }

  if (isError) {
    return (
      <div className="absolute w-[72vw] mx-auto left-96 mt-16">
        Error: {error.message}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="absolute w-[72vw] mx-auto left-96 mt-16">No data</div>
    );
  }
  return (
    <div className="absolute w-[72vw] mx-auto left-96 mt-16">
      <h4 className="text-2xl font-bold mb-4">Users</h4>
      <div className="grid grid-cols-5 gap-5">
        {data.map((user) => (
          <div className="flex items-center gap-3" key={user._id}>
            <Image
              className="w-[50px] h-[50px] object-cover rounded-full"
              src={user.avatarId.imageUrl}
              alt="avatar"
              width={50}
              height={50}
            />
            <div>
              <h4>{user.name}</h4>
              <p className="text-sm text-neutral-300">@{user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
