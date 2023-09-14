import React from "react";
import Navbar from "./Navbar";
import Welcome from "./Welcome";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatBox from "./ChatBox";
import { auth } from "../firebase_setup/firebase";

const ChatApp = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="bg-[#1C2C4C]  flex flex-col  min-h-[100vh]">
      <Navbar />
      {!user ? <Welcome /> : <ChatBox />}
    </div>
  );
};

export default ChatApp;
