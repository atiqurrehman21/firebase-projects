import React, { useEffect, useState } from "react";
import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase_setup/firebase";
import { NavLink, useNavigate } from "react-router-dom";
const SignFacebook = () => {
  const navigate = useNavigate();

  const HandleSubmit = () => {
    const provider = new FacebookAuthProvider();
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

  return (
    <div className="flex  justify-center py-1 flex-col items-center  bg-blue-100">
      <button
        class="shadow bg-purple-500  hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        onClick={HandleSubmit}
      >
        Sign In W Facebook
      </button>
    </div>
  );
};

export default SignFacebook;
