import Link from "next/link";
import React from "react";

import { ReturnIcon } from "../icons/Icons";

export default function ReturnButton({ path }) {
  return (
    <Link
      className="flex items-center gap-2 py-2 px-4 bg-neutral-700 hover:bg-neutral-600 w-max mb-10 rounded"
      href={path}
    >
      <ReturnIcon />
    </Link>
  );
}
