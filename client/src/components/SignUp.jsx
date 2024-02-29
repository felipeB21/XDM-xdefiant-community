"use client";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { signUp } from "@/api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const signUpUserMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      setError(error.response.data.errors);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData);
    user.avatar = selectedAvatar;
    signUpUserMutation.mutate(user);
  };
  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v2/avatars");
        if (!response.ok) {
          throw new Error("Failed to fetch avatars");
        }
        const avatarsData = await response.json();
        setAvatars(avatarsData);
      } catch (error) {
        console.error("Error fetching avatars:", error);
      }
    };

    fetchAvatars();
  }, []);

  return (
    <div className="absolute w-[30vw] left-[40vw] mt-20">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <h4 className="text-2xl font-medium mb-10">Sign Up</h4>
        <label htmlFor="email">Email</label>
        <input className="input-form" type="email" name="email" />
        {error?.email && <p className="text-red-500 mb-4">{error.email.msg}</p>}
        <label htmlFor="name">Name</label>
        <input className="input-form" type="text" name="name" />
        {error?.name && <p className="text-red-500 mb-4">{error.name.msg}</p>}
        <label htmlFor="username">Username</label>
        <input className="input-form" type="text" name="username" />
        {error?.username && (
          <p className="text-red-500 mb-4">{error.username.msg}</p>
        )}
        <label htmlFor="password">Password</label>
        <input className="input-form" type="password" name="password" />
        {error?.password && (
          <p className="text-red-500 mb-4">{error.password.msg}</p>
        )}
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input className="input-form" type="password" name="confirmPassword" />
        {error?.confirmPassword && (
          <p className="text-red-500 mb-4">{error.confirmPassword.msg}</p>
        )}
        <label htmlFor="avatar">Avatar</label>
        <div className="flex items-center justify-between mt-3">
          {avatars.map((avatar) => (
            <div
              key={avatar._id}
              className={`cursor-pointer mr-2 ${
                selectedAvatar === avatar.name
                  ? "border-2 border-blue-500 rounded-full"
                  : ""
              }`}
              onClick={() => setSelectedAvatar(avatar.name)}
            >
              <Image
                src={avatar.imageUrl}
                alt={avatar.name}
                width={50}
                height={50}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
          ))}
        </div>
        {error?.avatar && (
          <p className="text-red-500 mb-4">{error.avatar.msg}</p>
        )}
        <button className="btn-form">Sign Up</button>
      </form>
      <p className="mt-10">
        Already have an account?{" "}
        <Link href={"/signin"} className="text-blue-500 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
