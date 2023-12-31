import React, { useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase_setup/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { NavLink, useNavigate } from "react-router-dom";
const SignInWithGoogle = () => {
  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const HandleSubmit = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((results) => {
        localStorage.setItem("accessToken", results.user.accessToken);
        window.location.href = "/home";
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };
  const Signout=()=>{
    auth.signOut()
    
  }

  return (
      <button
        class="shadow bg-purple-500  hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        onClick={user?Signout: HandleSubmit}
      >
    {user?"Signout":"Sign In With Google"}
      </button>
  );
};

export default SignInWithGoogle;
