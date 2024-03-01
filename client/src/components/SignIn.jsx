import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="flex flex-col">
        <h4 className="text-2xl font-medium mb-10">Sign In</h4>
        <label htmlFor="email">Email</label>
        <input className="input-form" type="email" name="email" />
        {error?.email && <p className="text-red-500 mb-4">{error.email.msg}</p>}
        <label htmlFor="password">Password</label>
        <input className="input-form" type="password" name="password" />
        {error?.password && (
          <p className="text-red-500 mb-4">{error.password.msg}</p>
        )}
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
