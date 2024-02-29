"use client";
import SignIn from "@/components/SignIn";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function page() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <SignIn />
    </QueryClientProvider>
  );
}
