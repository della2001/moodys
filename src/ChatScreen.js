import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import "./ChatScreen.css";
import database from "./firebase";

const ChatScreen = ({ name, timestamp }) => {
  const [input, setInput] = useState("");
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
  };
  return (
    <div className="chatScreen">
      <p className="chatScreen__timestamp">
        YOU MATCHED WITH {name} ON {timestamp}
      </p>
      {messages.reverse().map((message) =>
        message.name !== "" ? (
          <div className="chatScreen__message">
            <Avatar
              className="chatScreen__image"
              alt={message.name}
              src={message.image}
            />
            <p className="chatScreen__text">{message.message}</p>
          </div>
        ) : (
          <div className="chatScreen__message">
            <p className="chatScreen__owntext">{message.message}</p>
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
