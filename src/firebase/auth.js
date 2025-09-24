import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err) {
    console.error("Google sign-in error:", err);
    return null;
  }
};

export const logout = async () => {
  await signOut(auth);
};
