// pages/signin.tsx
"use client";

import { signUserIn } from "../../utils/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signUserIn(email, password);
  };

  const handleSignUp = () => {
    router.push("/sign-up");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-md">
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 rounded-lg w-full mb-3"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 rounded-lg w-full mb-3"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full">
          Sign In
        </button>
        <div className="flex justify-center mt-2">
          <span className="text-gray-600">Don't have an account?</span>
          <button type="button" onClick={handleSignUp} className="text-blue-500 ml-1">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
