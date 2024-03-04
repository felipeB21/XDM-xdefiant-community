import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { signInContext, isAuthenticated, error, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, loading, router]);

  const onSubmit = handleSubmit(async (data) => {
    signInContext(data);
  });

  if (loading)
    return (
      <p className="flex items-center justify-center h-screen">Loading...</p>
    );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={onSubmit} className="flex flex-col">
        <h4 className="text-2xl font-medium mb-10">Sign In</h4>
        <label htmlFor="email">Email</label>
        <input className="input-form" type="email" {...register("email")} />
        {error?.email && <p className="error">{error.email.msg}</p>}
        <label htmlFor="password">Password</label>
        <input
          className="input-form"
          type="password"
          {...register("password")}
        />
        {error?.password && <p className="error">{error.password.msg}</p>}
        <button className="btn-form">Sign In</button>
      </form>
      <p className="mt-10">
        Don't have an account?{" "}
        <Link href={"/signup"} className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
