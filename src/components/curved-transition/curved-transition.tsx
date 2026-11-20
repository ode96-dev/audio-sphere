"use client";

import React from "react";

export function CurveDarkToSand({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none bg-[#161618] -mb-px ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-20 sm:h-32 md:h-40 block"
      >
        <path
          d="M 0 0 C 420 145, 1020 145, 1440 0 L 1440 160 L 0 160 Z"
          fill="#E4DBCD"
        />
      </svg>
    </div>
  );
}

export function CurveSandToDark({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none bg-[#E4DBCD] -mb-px ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-20 sm:h-32 md:h-40 block"
      >
        <path
          d="M 0 160 C 420 15, 1020 15, 1440 160 L 1440 160 L 0 160 Z"
          fill="#161618"
        />
      </svg>
    </div>
  );
}
