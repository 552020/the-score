"use client";

import { signUserUp } from "../../utils/auth";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setRegistrationStatus("Passwords do not match");
      return;
    }
    try {
      await signUserUp(email, password);
      setRegistrationStatus("Registration successful!");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setRegistrationStatus("Registration failed. Please try again.");
      console.error(error);
    }
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
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="border p-2 rounded-lg w-full mb-3"
        />
        {registrationStatus && <p className="text-red-500 mb-3">{registrationStatus}</p>}
        <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full">
          Sign Up
        </button>
      </form>
    </div>
  );
}
