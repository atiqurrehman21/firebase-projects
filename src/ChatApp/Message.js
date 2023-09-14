import React, { useEffect } from 'react'
import {auth} from "../firebase_setup/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
const Message = ({message}) => {
    const [user]=useAuthState(auth)
    console.log(user,"user",message)
    useEffect(()=>{

    },[message])
  return (
    <div className={` flex ${message?.uid ===user?.uid ? "":" justify-end"}`}> 
    <div
      className={`flex   max-w-max  m-3 rounded-tl-2xl rounded-tr-2xl  ml-10 px-3   items-center gap-6 py-2    ${message?.uid ===user?.uid ? "text-black bg-[#7AC2D8] rounded-br-2xl  " : "   rounded-bl-2xl bg-white text-black"}`}>
      <img
        className="w-9 h-9"
        src={message.avatar?message.avatar:"https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg"}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <p className=" text-sm  font-semibold">{message.name?message.name:"test User"}</p>
        <p className=" text-xs font-normal">{message.text}</p>
      </div>
    </div>
    </div>
    
      
  )
}

export default Message