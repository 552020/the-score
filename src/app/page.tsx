"use client";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { useAuth } from "../utils/auth";
import Header from "./components/Header";
import { getFirestore, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";

export default function Home() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false); // A state to hold if we need to show warning

  const db = getFirestore();

  // On component mount and when user changes
  useEffect(() => {
    let unsubscribe: () => void;
    if (user) {
      const userRef = doc(db, "users", user.uid);

      // Listen for real-time updates to the document
      unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          setCount(doc.data().count || 0);
        }
      });
    } else {
      // If user is null (signed out), reset the count
      setCount(0);
    }
    // Clean up the listener when the component is unmounted or the user logs out
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, db]);

  const incrementCount = async (user: User | null) => {
    setCount((prevCount) => prevCount + 1);

    if (user) {
      setShowWarning(false); // If user is logged in, no need to show warning
      const userRef = doc(db, "users", user.uid);
      updateDoc(userRef, { count: count + 1 }); // Updating Firestore here
    } else {
      // User is not logged in
      setShowWarning(true); // Update state to show warning
    }
  };

  return (
    <div>
      <div>
        <div className="min-h-screen bg-gray-100">
          <Header user={user} />
          <div className="flex flex-col items-center justify-center space-y-4 mt-8">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white text-black text-center text-5xl rounded-lg px-4 py-16 w-full">{count}</div>
              <button
                className="bg-blue-500 text-white rounded-lg px-16 py-8 text-6xl"
                onClick={() => incrementCount(user)}
              >
                +
              </button>
              {showWarning && <div>Please sign-in to save your progress.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
