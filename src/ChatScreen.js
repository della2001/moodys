import React, { useState, useEffect, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import "./ChatScreen.css";
import database from "./firebase";
import useChatRoom from "./useChatRoom";
import clsx from "clsx";



const ChatScreen = ({ name, timestamp }) => {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChatRoom();
  const [newMessage, setNewMessage] = useState("");
  const messageRef = useRef();


  /*

  useEffect(() => {
    const unsubscribe = database
      .collection("messages")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );

    return () => {
      unsubscribe();
    };
  }, []);*/

  const handleNewMessageChange = event => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    database
      .collection("messages")
      .add({
        image: "",
        message: newMessage,
        name: "",
      })
      .then((docRef) => {
        console.log("Document written with ID", docRef.id);
        console.log(newMessage)
      })
      .catch((error) => {
        console.log("Error adding document: ", error);
      });
    if (newMessage !== "") {
      sendMessage(newMessage);
      setNewMessage("");
    }
    console.log("MESSAGES");
    console.log(messages)
  };

  

  /*
  const [messages, setMessages] = useState([
    // {
    //   name: "Labrador",
    //   image:
    //     "https://gooddoggies.online/wp-content/uploads/2020/06/5-Tips-To-Training-A-Labrador-Puppy-1.jpg",
    //   message: "Hey",
    // },
    // {
    //   name: "Labrador",
    //   image:
    //     "https://gooddoggies.online/wp-content/uploads/2020/06/5-Tips-To-Training-A-Labrador-Puppy-1.jpg",
    //   message: "Bork bork bork",
    // },
    // {
    //   message: "yo",
    // },
  ]);

  useEffect(() => {
    const unsubscribe = database
      .collection("messages")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    database
      .collection("messages")
      .add({
        image: "",
        message: input,
        name: "",
      })
      .then((docRef) => {
        console.log("Document written with ID", docRef.id);
      })
      .catch((error) => {
        console.log("Error adding document: ", error);
      });
    // setMessages({
    //   message: input,
    //   name: "",
    // });
    setInput("");
  };*/
  return (
    <div className="chatScreen">
      <p className="chatScreen__timestamp">
        YOU MATCHED WITH {name} ON {timestamp}
      </p>
      
      {messages.map((message, i) =>
        (
          <div key={i}>
            <Avatar
              className="chatScreen__image"
              alt={message.body}
              src={message.image}
            />
            <div className="chatScreen__message">
            <p className={clsx(message.isOwner ? "chatScreen__owntext" : "chatScreen__text")}>{message.body}</p>
          </div>
          </div>
        )
      )}
      <div ref={messageRef}></div>

      <form className="chatScreen__form">
        <input
          className="chatScreen__input"
          type="text"
          id="message"
          value={newMessage}
          onChange={handleNewMessageChange}
        />
        <button
          onClick={handleSendMessage}
          type="submit"
          className="chatScreen__button"
        >
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatScreen;
