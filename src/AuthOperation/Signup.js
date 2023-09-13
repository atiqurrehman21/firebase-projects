import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase_setup/firebase";
import { v4 as uuidv4 } from "uuid";
import { NavLink, useNavigate } from "react-router-dom";
const Signup = () => {
  const [detail, setdetail] = useState({
    id: uuidv4(),
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const HandleChange = (name, value) => {
    setdetail({ ...detail, [name]: value });
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(detail, "details");
    if (Object.values(detail).some((x) => x === "")) {
      alert("Please fill all the fields");
      return;
    }
    await createUserWithEmailAndPassword(auth, detail.email, detail.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        localStorage.setItem("accessToken",user.accessToken);
        window.location.href = "/";

        navigate("/home");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });

    setdetail({ id: uuidv4(), password: "", email: "" });
  };

  useEffect(()=>{
    if(localStorage.getItem("accessToken")){
      navigate("/")
    }else{
      navigate("/signup")
    }
  },[])
  return (
    <div className="flex  justify-center py-8  flex-col items-center gap-7 h-[100vh] bg-blue-100">
      <h1 className=" font-bold text-3xl">Firebase Sign up</h1>
      <form class="w-full max-w-sm" onSubmit={HandleSubmit}>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-password"
            >
              Email
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-password"
              type="email"
              placeholder="Enter Email"
              value={detail.email}
              onChange={(e) => HandleChange("email", e.target.value)}
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6 justify-center items-center">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-full-name"
            >
              Password
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              placeholder="Enter Password"
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="password"
              value={detail.password}
              onChange={(e) => HandleChange("password", e.target.value)}
            />
          </div>
        </div>

        <div class="md:flex md:items-center justify-center flex-col gap-4 items-center flex">
          <button
            class="shadow bg-purple-500  hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="sumbit"
          >
            Sig Up
          </button>
          <p>
            Already have an account? <NavLink to="/login">Sign in</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
