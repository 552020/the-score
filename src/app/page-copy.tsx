"use client";

import { useAuth, signUserOut } from "../utils/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-4">
      <button className="bg-blue-500 text-white rounded-lg px-4 py-2" onClick={() => router.push("/sign-in")}>
        Sign In
      </button>
      <button className="bg-blue-500 text-white rounded-lg px-4 py-2" onClick={() => router.push("/sign-up")}>
        Sign Up
      </button>
      {user && (
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2" onClick={signUserOut}>
          Sign Out
        </button>
      )}
    </div>
  );
}
