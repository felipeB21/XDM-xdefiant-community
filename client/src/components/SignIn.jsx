import React, { useState } from "react";
import { useMutation } from "react-query";
import { signIn } from "@/api/auth";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const signInUserMutation = useMutation({
    mutationFn: signIn,
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
    signInUserMutation.mutate(user);
  };

  return (
    <div className="absolute w-[50vw] left-[31vw] mt-16">
      <form onSubmit={handleSubmit} className="flex flex-col">
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
    </div>
  );
}
