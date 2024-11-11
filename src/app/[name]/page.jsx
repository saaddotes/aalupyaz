"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function MoreAboutDymanic() {
  const params = useParams();
  const { name } = params;

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}
