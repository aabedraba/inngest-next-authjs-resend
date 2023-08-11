"use client";

import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";

export const LoginButton = ({ user }: { user: any }) => {
  console.log("🚀 ~ file: siging.tsx:7 ~ LoginButton ~ user:", user)
  if (!user) {
    return (
      <button
        onClick={() => {
          signIn("github");
        }}
      >
        Sign in
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={() => {
          signOut();
        }}
      >
        <p>{user.user.name}</p>
        Sign out
      </button>
    </div>
  );
};
