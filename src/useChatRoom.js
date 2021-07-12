import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

// this is the same event name as our server. This will allow communication between the server and client possible.
const NEW_MESSAGE_EVENT = "new-message-event"; 
const SOCKET_SERVER_URL = "http://localhost:3030";

const useChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    console.log("1")
    // create a new client with our server url
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    console.log("2")

    // listen for incoming message
    socketRef.current.on(NEW_MESSAGE_EVENT, (message) => {
      console.log(message)
      const incomingMessage = {
        ...message,
        isOwner: message.senderId === socketRef.current.id,
      };
      // send the new message to the others in the same room.
      setMessages((messages) => [...messages, incomingMessage]);
    });
    console.log("3")
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // send the messagee along with a sender id. The sender id would allow us to style the UI just like a message app like iOS.
  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };
  console.log(messages)
  return { messages, sendMessage };
};

export default useChatRoom;