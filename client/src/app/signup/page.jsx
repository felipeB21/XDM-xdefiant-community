"use client";
import SignUp from "@/components/SignUp";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function page() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignUp />
    </QueryClientProvider>
  );
}
