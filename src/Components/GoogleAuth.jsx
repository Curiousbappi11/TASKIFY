import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { signInWithGoogle, logout } from "../firebase/auth";
import { FcGoogle } from "react-icons/fc";

function GoogleAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return unsubscribe;
  }, []);

  return (
    <>
      {user ? (
        <>
          <button
            onClick={logout}
            className="border hover:bg-red-300 transition-colors text-[#333] px-2 py-1 rounded-lg text-[0.7rem] font-medium"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="flex items-center gap-2 bg-[#ececec hover:bg-[#bac4ff] transition-colors border border-[#333] px-5 py-1 rounded-lg text-[0.2rem] font-bold text-gray-800"
        >
          <div className=" p-0.5 bg-white rounded-full">
            <FcGoogle size={14} />
          </div>
        </button>
      )}
    </>
  );
}

export default GoogleAuth;
