"use client";
import Header from "../components/Header";
import { signUserIn, signUserUp, useAuth } from "../../utils/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

const EmailVerificationScreen = () => {
  return (
    <div className="container m-auto min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4">Email Verification</h2>
        <p className="text-lg mb-4">
          Thank you for signing up! Please check your email for a verification link to complete your registration.
        </p>
        <p className="text-lg mb-4">
          If you didn&apos;t receive the email, please check your spam folder or request a new verification link.
        </p>
      </div>
    </div>
  );
};

export default function AuthForm({ mode }: { mode: "signIn" | "signUp" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const router = useRouter();
  const [showVerficationScreen, setShowVerificationScreen] = useState(false);
  const { user } = useAuth();

  const isSignInMode = mode === "signIn";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword && !isSignInMode) {
      setFormStatus("Passwords do not match");
      return;
    }
    try {
      isSignInMode ? await signUserIn(email, password) : await signUserUp(email, password);
      setFormStatus(isSignInMode ? "Login successful!" : "Registration successful!");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      if (!isSignInMode) {
        setShowVerificationScreen(true);
        return;
      }
      router.push("/");
    } catch (error) {
      setFormStatus(isSignInMode ? "Login failed. Please try again." : "Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div>
      {showVerficationScreen ? (
        <EmailVerificationScreen />
      ) : (
        <div>
          <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
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
              {!isSignInMode && (
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="border p-2 rounded-lg w-full mb-3"
                />
              )}
              {formStatus && <p className="text-red-500 mb-3">{formStatus}</p>}
              <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full">
                {isSignInMode ? "Sign In" : "Sign Up"}
              </button>
            </form>
            {isSignInMode && (
              <div className="mt-4 text-center">
                <p>Don&apos;t have an account?</p>

                <button
                  className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2 w-full"
                  onClick={() => router.push("/sign-up")}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
