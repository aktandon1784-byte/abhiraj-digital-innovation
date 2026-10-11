import React from "react";

export function PlayStoreIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3.609 1.814L13.792 12 3.609 22.186C3.24 21.821 3 21.309 3 20.732V3.268C3 2.691 3.24 2.179 3.609 1.814Z"
        fill="#00C1A4"
      />
      <path
        d="M17.202 8.59L13.792 12L3.609 1.814C4.015 1.417 4.604 1.258 5.178 1.583L17.202 8.59Z"
        fill="#00B0FF"
      />
      <path
        d="M17.202 15.41L5.178 22.417C4.604 22.742 4.015 22.583 3.609 22.186L13.792 12L17.202 15.41Z"
        fill="#FF3A44"
      />
      <path
        d="M21.365 11.004L17.202 8.59L13.792 12L17.202 15.41L21.365 12.996C22.212 12.508 22.212 11.492 21.365 11.004Z"
        fill="#FFD400"
      />
    </svg>
  );
}
