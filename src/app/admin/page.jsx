"use client";
import Admin from "@/components/Admin";
import Login from "@/components/Login";
import { useAuth } from "@/context/authContext";
import React from "react";

export default function page() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <>
      <Admin />
    </>
  );
}
