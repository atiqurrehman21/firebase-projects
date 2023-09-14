import { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import SendMessage from "./SendMessage";
import Message from "./Message";

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const scroll=useRef()
    useEffect(()=>{
    const data =  query(collection(firestore, "messages"),orderBy("createdAt", "desc"),limit(50));
     onSnapshot(data, (snapshot) => {
        
    const fetchedMessages = [];
      snapshot.forEach((doc) => {
        fetchedMessages.push({...doc.data(), id: doc.id });
      });
      const sortedMessages=fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    //   setIds(dataId);
      setLoading(false);
    })

    

    },[])
  return (
     <main className="chat-box  ">
      <div className="flex flex-col">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
  )
}

export default ChatBox