import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import "./ChatScreen.css";
import database from "./firebase";

const ChatScreen = ({ name, timestamp }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    // {
    //   name: "Elon Musk",
    //   image:
    //     "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg",
    //   message: "Welcome to Moody's",
    // },
    // // {
    // //   name: "Elon Musk",
    // //   image:
    // //     "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg",
    // //   message: "Bork bork bork",
    // // },
    // {
    //   message: "yo",
    // },
  ]);
  //Read existing data into messages
  useEffect(() => {
    const unsubscribe = database
      .collection("messages")
      .doc("room1")
      .onSnapshot((doc) => {
        setMessages(doc.data()["texts"]);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    // Update messages locally
    setMessages([...messages, { text: input }]);
    // Update database by rewriting with messages
    database
      .collection("messages")
      .doc("room1")
      // .onSnapshot((doc) => {
      //   doc.data()["texts"].a;
      // });
      .update({
        texts: messages,
      })
      .then((docRef) => {
        console.log("Document Updated");
      })
      .catch((error) => {
        console.log("Error adding document: ", error);
      });
    setInput("");
  };
  return (
    <div className="chatScreen">
      <p className="chatScreen__timestamp">
        YOU MATCHED WITH {name} ON {timestamp}
      </p>
      {messages.map((message) =>
        message.name ? (
          <div className="chatScreen__message">
            <Avatar
              className="chatScreen__image"
              alt={message.name}
              src={message.image}
            />
            <p className="chatScreen__text">{message.text}</p>
          </div>
        ) : (
          <div className="chatScreen__message">
            <p className="chatScreen__owntext">{message.text}</p>
          </div>
        )
      )}
      <form className="chatScreen__form">
        <input
          className="chatScreen__input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSend}
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
