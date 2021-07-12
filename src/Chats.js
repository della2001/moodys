import React, { useState, useEffect } from "react";
import "./Chats.css";
import Chat from "./Chat";
import database from "./firebase";

const Chats = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const unsubscribe = database
      .collection("people")
      .onSnapshot((snapshot) =>
        setPeople(snapshot.docs.map((doc) => doc.data()))
      );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="chats">
      {people.map((person) =>
        person.team === "MA" ? (
          <Chat
            key={person.firstName}
            name={person.firstName + " " + person.lastName}
            // message="Wuff"
            team={person.team}
            profilePic={person.url}
          />
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default Chats;
