"use client";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { useAuth } from "../utils/auth";
import Header from "./components/Header";
import { getFirestore, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";

import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const db = getFirestore();

  // On component mount and when user changes
  useEffect(() => {
    //     async function fetchCount() {
    //       if (user) {
    //         const docRef = doc(db, "users", user.uid);
    //         const docSnap = await getDoc(docRef);

    //         if (docSnap.exists()) {
    //           setCount(docSnap.data().count || 0);
    //         } else {
    //           // User doc does not exist - this should not normally happen
    //           console.log("No such document!");
    //         }
    //       }
    //     }

    //     fetchCount();
    //   }, [user]);
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

  //   const incrementCount = async (user: User | null) => {
  //     if (user) {
  //       setCount((prevCount) => prevCount + 1);
  //       const userRef = doc(db, "users", user.uid);
  //       await updateDoc(userRef, { count: count + 1 });
  //     }
  //   };
  const incrementCount = async (user: User | null) => {
    if (user) {
      setCount((prevCount) => {
        const newCount = (prevCount || 0) + 1;
        const userRef = doc(db, "users", user.uid);
        updateDoc(userRef, { count: newCount }); // Updating Firestore here
        return newCount;
      });
    }
  };

  return (
    <div>
      <div>
        <div className="min-h-screen bg-gray-100">
          <Header user={user} />
          <div className="flex flex-col items-center justify-center space-y-4 mt-8">
            <div className="grid grid-cols-1 gap-4">
              <button
                className="bg-blue-500 text-white rounded-lg px-16 py-8 text-6xl"
                onClick={() => incrementCount(user)}
              >
                +
              </button>
              <div className="bg-white text-black text-center text-5xl rounded-lg px-4 py-2 w-full">Count: {count}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
