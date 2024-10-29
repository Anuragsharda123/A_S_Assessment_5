import React, { useState } from 'react'
// import { useParams } from 'react-router-dom'
import {io} from 'socket.io-client'

const Chat:React.FC = () => {
    // const {senderId, receiverId} = useParams();
    const [message, setMessage] = useState<string>();
    const [messages, setMessages] = useState<any>([]);

    const socket = io("http://localhost:4000");

    socket.on("received_message", (Message)=>{
        setMessages([...messages, Message]);
    })
    
    const sendMessage = () => {
        message?.trim()
        socket.emit("send_message", message);
        console.log("message:---->", message)
        setMessage("");
    }
    
  return (
    <>
    <div className='container border border-dark rounded-2'>
        {messages.map((mess:string)=>(
            <>
            <div>
                <p>{mess}</p>
            </div>
            
            </>
        ))}

    </div>
    
    <input type="text"
    value={message}
    onChange={(e)=>{
        setMessage(e.target.value);
    }} />
    <button onClick={sendMessage} >Send</button>
    </>
  )
}

export default Chat