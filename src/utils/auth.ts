import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
  User,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const signUserUp = async (email: string, password: string): Promise<User> => {
  try {
    // await createUserWithEmailAndPassword(auth, email, password);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // console.log(userCredential);
    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signUserIn = async (email: string, password: string): Promise<User> => {
  const auth = getAuth();
  const db = getFirestore();
  try {
    // await signInWithEmailAndPassword(auth, email, password);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // console.log(userCredential);
    const user = userCredential.user;
    // Check if a document for the user already exists
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      // If the document does not exist, create it
      await setDoc(userDocRef, {
        count: 0,
        // other user data you want to store...
      });
    }

    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signUserOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const removeAuthListener = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      if (currentUser) {
        const isEmailVerified = currentUser.emailVerified;
        setUser(isEmailVerified ? currentUser : null);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => removeAuthListener();
  }, []);

  return { user, loading };
};
