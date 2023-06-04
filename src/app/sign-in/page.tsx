// pages/signin.tsx
"use client";
import Header from "../components/Header";
import AuthForm from "../components/AuthForm";
import { signUserIn, signUserOut, useAuth } from "../../utils/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signUserIn(email, password);
    router.push("/settings"); // Redirect to the settings after successful sign-in
  };

  const handleSignUp = () => {
    router.push("/sign-up");
  };

  const handleSignOut = async () => {
    await signUserOut();
    // Redirect to the sign-in page or any other desired page
    router.push("/sign-in");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header user={user} /> {/* Render the Header component */}
      <AuthForm mode="signIn" />
    </div>
  );
}
