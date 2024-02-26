"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const {
    signUp,
    getAvatars,
    avatars,
    errors: authErrors,
    isAuthenticated,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedAvatarName, setSelectedAvatarName] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getAvatars();
  }, []);

  const handleAvatarSelect = (avatarName) => {
    setSelectedAvatarName(avatarName);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const userData = { ...data, avatar: selectedAvatarName };
      signUp(userData);
    } catch (error) {
      console.error("API error:", error);
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input className="form-input" type="text" {...register("name")} />
        {errors.name && <p className="error">{errors.name.message}</p>}
        {authErrors?.name && <p className="error">{authErrors.name.msg}</p>}
        <label htmlFor="email">Email</label>
        <input type="email" {...register("email")} className="form-input" />
        {errors.email && <p className="error">{errors.email.message}</p>}
        {authErrors?.email && <p className="error">{authErrors.email.msg}</p>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register("password")}
          className="form-input"
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
        {authErrors?.password && (
          <p className="error">{authErrors.password.msg}</p>
        )}
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="form-input"
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}
        {authErrors?.confirmPassword && (
          <p className="error">{authErrors.confirmPassword.msg}</p>
        )}
        <div className="mt-6">
          <h4>Choose an Avatar</h4>
          <div className="flex flex-col">
            <div className="flex items-center gap-5 py-5">
              {avatars.map((avatar) => (
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
                    onClick={() => handleAvatarSelect(avatar.name)}
                  />
                </div>
              ))}
            </div>
            {authErrors?.avatar && (
              <p className="error">{authErrors.avatar.msg}</p>
            )}
          </div>
        </div>
        <button className="btn-submit" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
