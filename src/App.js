import React from "react";
import Header from "./Header";
// import TinderCards from "./TinderCards";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import SwipeButtons from "./SwipeButtons";
import Chats from "./Chats";
import ChatScreen from "./ChatScreen";
import UserForm from "./components/UserForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/chat/:person">
            <Header backButton="/chat" />
            <ChatScreen />
          </Route>
          <Route path="/chat">
            <Header backButton="/" />
            <Chats />
          </Route>
          <Route path="/form">
            <Header backButton="/" />
            <UserForm />
          </Route>
          <Route path="/">
            <Header />
            <div className="body">
              <h1>Welcome to the Moody's Networking App</h1>
              <p1>
                Fill out your User Profile in the Top Left Icon <br></br>
              </p1>
              <p2>
                Once the form is submitted, head to the chat option in the Top
                Right Icon!
              </p2>
            </div>

            {/* <TinderCards /> */}
            {/* <SwipeButtons /> */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
