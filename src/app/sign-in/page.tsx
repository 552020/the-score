// pages/signin.tsx
"use client";
import Header from "../components/Header";
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
    router.push("/dashboard"); // Redirect to the dashboard after successful sign-in
  };

  const handleSignUp = () => {
    router.push("/sign-up");
  };

  const handleSignOut = async () => {
    await signUserOut();
    // Redirect to the sign-in page or any other desired page
    router.push("/sign-in");
  };

  //   return (
  //     <div>
  //       <Header user={user} /> {/* Render the Header component */}
  //       {user ? (
  //         <div className="bg-white p-10 rounded-lg shadow-md">
  //           <p>You are already signed in as: {user.email}</p>
  //           <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4" onClick={handleSignOut}>
  //             Sign Out
  //           </button>
  //           <button
  //             className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4"
  //             onClick={() => router.push("/dashboard")}
  //           >
  //             Go to Dashboard
  //           </button>
  //         </div>
  //       ) : (
  //         <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-md">
  //           <input
  //             type="email"
  //             onChange={(e) => setEmail(e.target.value)}
  //             placeholder="Email"
  //             className="border p-2 rounded-lg w-full mb-3"
  //           />
  //           <input
  //             type="password"
  //             onChange={(e) => setPassword(e.target.value)}
  //             placeholder="Password"
  //             className="border p-2 rounded-lg w-full mb-3"
  //           />
  //           <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full">
  //             Sign In
  //           </button>
  //         </form>
  //       )}
  //     </div>
  //   );
  //   return (
  //     <div>
  //       <Header user={user} /> {/* Render the Header component */}
  //       {user ? (
  //         <div className="bg-white p-10 rounded-lg shadow-md">
  //           <p>You are already signed in as: {user.email}</p>
  //           <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4" onClick={handleSignOut}>
  //             Sign Out
  //           </button>
  //           <button
  //             className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4"
  //             onClick={() => router.push("/dashboard")}
  //           >
  //             Go to Dashboard
  //           </button>
  //         </div>
  //       ) : (
  //         <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-md">
  //           <input
  //             type="email"
  //             onChange={(e) => setEmail(e.target.value)}
  //             placeholder="Email"
  //             className="border p-2 rounded-lg w-full mb-3"
  //           />
  //           <input
  //             type="password"
  //             onChange={(e) => setPassword(e.target.value)}
  //             placeholder="Password"
  //             className="border p-2 rounded-lg w-full mb-3"
  //           />
  //           <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full hover:bg-blue-600">
  //             Sign In
  //           </button>
  //         </form>
  //       )}
  //     </div>
  //   );
  //   return (
  //     <div>
  //       <Header user={user} /> {/* Render the Header component */}
  //       {user ? (
  //         <div className="bg-white p-10 rounded-lg shadow-md">
  //           <p>You are already signed in as: {user.email}</p>
  //           <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4" onClick={handleSignOut}>
  //             Sign Out
  //           </button>
  //           <button
  //             className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4"
  //             onClick={() => router.push("/dashboard")}
  //           >
  //             Go to Dashboard
  //           </button>
  //         </div>
  //       ) : (
  //         <div className="bg-white p-10 rounded-lg shadow-md">
  //           <form onSubmit={handleSubmit}>
  //             <input
  //               type="email"
  //               onChange={(e) => setEmail(e.target.value)}
  //               placeholder="Email"
  //               className="border p-2 rounded-lg w-full mb-3"
  //             />
  //             <input
  //               type="password"
  //               onChange={(e) => setPassword(e.target.value)}
  //               placeholder="Password"
  //               className="border p-2 rounded-lg w-full mb-3"
  //             />
  //             <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full hover:bg-blue-600">
  //               Sign In
  //             </button>
  //           </form>
  //           <button
  //             className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4 w-full"
  //             onClick={() => router.push("/sign-up")}
  //           >
  //             Sign Up
  //           </button>
  //         </div>
  //       )}
  //     </div>
  //   );

  return (
    <div>
      <Header user={user} /> {/* Render the Header component */}
      {user ? (
        <div className="bg-white p-10 rounded-lg shadow-md">
          <p>You are already signed in as: {user.email}</p>
          <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4" onClick={handleSignOut}>
            Sign Out
          </button>
          <button
            className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      ) : (
        <div className="bg-white p-10 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full hover:bg-blue-600">
              Sign In
            </button>
          </form>
          <br />
          <div className="mt-4 text-center">
            <p>Don't have an account?</p>
            <button
              className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2 w-full"
              onClick={() => router.push("/sign-up")}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
