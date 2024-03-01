"use client";
import React, { useEffect, useState } from "react";
import { getAvatars } from "@/api/auth";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import Image from "next/image";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const { signUpContext, isAuthenticated, error } = useAuth();
  const [selectedAvatarName, setSelectedAvatarName] = useState(null);

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      console.log("Redirecting to /");
      router.push("/");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (data) => {
    const userData = { ...data, avatar: selectedAvatarName };
    signUpContext(userData);
  });

  const {
    isLoading,
    data: avatars,
    isError,
  } = useQuery({
    queryKey: ["avatars"],
    queryFn: getAvatars,
  });

  const handleAvatarSelect = (avatarName) => {
    setSelectedAvatarName(avatarName);
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center h-screen">
      <form onSubmit={onSubmit} className="flex flex-col">
        <h4 className="text-2xl font-medium mb-10">Sign Up</h4>
        <label htmlFor="email">Email</label>
        <input
          className="input-form"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && <p className="error">Email is required</p>}
        {error?.email && <p className="error">{error.email.msg}</p>}
        <label htmlFor="name">Name</label>
        <input
          className="input-form"
          type="text"
          {...register("name", { required: true })}
        />
        {errors.name && <p className="error">Name is required</p>}
        {error?.name && <p className="error">{error.name.msg}</p>}
        <label htmlFor="username">Username</label>
        <input
          className="input-form"
          type="text"
          {...register("username", { required: true })}
        />
        {errors.username && <p className="error">Username is required</p>}
        {error?.username && <p className="error">{error.username.msg}</p>}
        <label htmlFor="password">Password</label>
        <input
          className="input-form"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <p className="error">Password is required</p>}
        {error?.password && <p className="error">{error.password.msg}</p>}
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          className="input-form"
          type="password"
          {...register("confirmPassword", { required: true })}
        />
        {errors.confirmPassword && (
          <p className="error">Confirm Password is required</p>
        )}
        {error?.confirmPassword && (
          <p className="error">{error.confirmPassword.msg}</p>
        )}
        <label htmlFor="avatar">Avatar</label>
        <div className="flex items-center gap-3 mt-3">
          {isLoading ? (
            <p>Loading avatars...</p>
          ) : isError ? (
            <p>Error loading avatars</p>
          ) : (
            avatars.map((avatar) => (
              <div key={avatar.name}>
                <Image
                  className={`rounded-full cursor-pointer object-cover w-[60px] h-[60px] ${
                    selectedAvatarName === avatar.name
                      ? "border-2 border-blue-500"
                      : ""
                  }`}
                  src={avatar.imageUrl}
                  alt={avatar.name}
                  width={60}
                  height={60}
                  priority
                  onClick={() => handleAvatarSelect(avatar.name)} // Call handleAvatarSelect with the avatar name when clicked
                />
              </div>
            ))
          )}
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
