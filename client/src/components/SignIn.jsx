"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, isAuthenticated, errors: authErrors } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);

    if (isAuthenticated) {
      router.push("/");
      router.refresh();
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      signIn(data);
    } catch (error) {
      console.error("API error:", error);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="flex flex-col" onSubmit={onSubmit}>
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

        <button type="submit" className="btn-submit my-5">
          Sign In
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link className="text-blue-500 hover:underline" href="/signup">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
