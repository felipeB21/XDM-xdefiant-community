import React from "react";

export default function Hero() {
  return (
    <div className="min-h-screen py-16 px-32 overflow-hidden bg-gradient-to-br from-zinc-800 to-black">
      <div className="flex flex-col">
        <h1 className="text-4xl font-medium max-w-md">
          Discover, Create, and Share Loadouts with{" "}
          <span className="font-bold">XDMUNITY</span>
        </h1>
        <h2 className="text-xl py-2">Be part of the future of XDefiant.</h2>
      </div>
    </div>
  );
}
