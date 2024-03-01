"use client";
import { useQuery } from "react-query";
import { getUsers } from "@/api/auth";
import Image from "next/image";
import Link from "next/link";
export default function Users() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) {
    return <div className="mt-24 w-[1200px] mx-auto">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="mt-24 w-[1200px] mx-auto">Error: {error.message}</div>
    );
  }

  if (!data) {
    return <div className="mt-24 w-[1200px] mx-auto">No data</div>;
  }
  return (
    <div className="mt-24 w-[1200px] mx-auto">
      <h4 className="text-2xl font-bold mb-4">Users</h4>
      <div className="grid grid-cols-5 gap-5">
        {data.map((user) => (
          <Link
            href={`/users/${user.username}`}
            className="flex items-center gap-3"
            key={user._id}
          >
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
          </Link>
        ))}
      </div>
    </div>
  );
}
