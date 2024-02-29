"use client";
import Users from "@/components/Users";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function page() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Users />
    </QueryClientProvider>
  );
}
