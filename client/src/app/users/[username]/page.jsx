"use client";
import UserProfile from "@/components/UserProfile";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function page() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProfile />
    </QueryClientProvider>
  );
}
