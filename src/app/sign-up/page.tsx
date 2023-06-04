"use client";

import { signUserUp } from "../../utils/auth";
import { useState } from "react";
import Header from "../components/Header";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../../utils/auth";

function RegisteredScreen() {
  const user = useAuth().user;
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white p-10 rounded-lg shadow-md">
          <span role="img" aria-label="Party emoji">
            🎉
          </span>
          <h2 className="text-2xl font-semibold mt-4">Registration submitted successfully!</h2>
          <p className="text-gray-600 mt-2">Please check your email for further instructions.</p>
        </div>
      </div>
    </div>
  );
}

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const user = useAuth().user;

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
      setHasSubmitted(true); //
    } catch (error) {
      setRegistrationStatus("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    // <div>dd
    <div className="bg-white min-h-screen flex flex-col">
      <Header user={user} />

      <AuthForm mode="signUp" />
    </div>
  );
}
