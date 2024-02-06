import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignUp from "../components/SignUp";
import Login from "../components/Login";

//#################################### For testing Need to remove ##################################################
const log = console.log;

function App() {
  const views = {
    LOGIN: 1,
    SIGNUP: 0
  }
  const [view, setView] = useState(views.SIGNUP);

  return (
    <>
      {view === 0 ? <SignUp setView={setView} views={views}/> : <Login setView={setView} views={views}/>}
    </>
  );
}

export default App;
