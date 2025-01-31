import React from "react";

export default function Loading() {
  return (
    <div className="fixed top-0 h-screen w-screen flex justify-center items-center">
      <span className="loading loading-ring loading-lg text-warning"></span>
    </div>
  );
}
