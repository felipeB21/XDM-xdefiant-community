"use client";
import Factions from "@/components/Factions";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Factions />
    </QueryClientProvider>
  );
}
