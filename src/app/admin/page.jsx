"use client";
import Admin from "@/components/Admin";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import { useAuth } from "@/context/authContext";
import React from "react";

export default function page() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <Loading />
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
