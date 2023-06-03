import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { useEffect, useState } from "react";

export const signUserUp = async (email, password) => {
  try {
    // await createUserWithEmailAndPassword(auth, email, password);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signUserIn = async (email, password) => {
  try {
    // await signInWithEmailAndPassword(auth, email, password);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return user;
};
