import React, { useState } from 'react'
import {auth,firestore} from "../firebase_setup/firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
const SendMessage = ({scroll}) => {
    const [message, setMessage] = useState("");
    const sendMessage = async (event) => {
        event.preventDefault();
        if (message.trim() === "") {
          alert("Enter valid message");
          return;
        }
        
        const { uid, displayName, photoURL } = auth.currentUser;
        await addDoc(collection(firestore, "messages"), {
          text: message,
          name: displayName,
          avatar: photoURL,
          createdAt: serverTimestamp(),
          uid,
        });
        setMessage("");
        scroll.current.scrollIntoView({ behavior: "smooth" });
      };
  return (
    <div className='bg-[#4C768D]  px-4 py-3    fixed w-full  bottom-0'>

    
    <form className="send-message" onSubmit={(event) => sendMessage(event)}>
        <div className='flex flex-row'>
            
       <div className='w-full'>
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input  h-10 rounded-l-lg p-2 w-full   focus:outline-none"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      </div>
      <button className='bg-[#7AC2D8] p-2 w-20 rounded-r-lg' type="submit">Send</button>
      </div>

    </form>
    </div>
  )
}

export default SendMessage