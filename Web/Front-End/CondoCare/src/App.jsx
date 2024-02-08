import { useState } from "react";

import "./App.css";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Profile from "../components/Profile"

//#################################### For testing Need to remove ##################################################
const log = console.log;

function App() {
  const views = {
    PROFILE: 2,
    LOGIN: 1,
    SIGNUP: 0,
  };
  const [view, setView] = useState(views.SIGNUP);
  const [userData, setUserData] = useState({}); 

  return (
    <>
      {view === views.SIGNUP ? (
        <SignUp setView={setView} views={views} />
      ) : view === views.LOGIN ? (
        <Login setView={setView} views={views} setUserData={setUserData} />
      ) : (
        <Profile userData={userData}/>
      )}
    </>
  );
}

export default App;
