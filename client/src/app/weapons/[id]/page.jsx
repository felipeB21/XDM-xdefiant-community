"use client";
import WeaponId from "@/components/WeaponId";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function page() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeaponId />
    </QueryClientProvider>
  );
}
