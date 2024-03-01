"use client";
import Weapons from "@/components/Weapons";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Weapons />
    </QueryClientProvider>
  );
}
