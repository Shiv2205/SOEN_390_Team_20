import { useState } from "react";
import "./App.css";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import LandingPage from "../components/LandingPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardOwner from "../components/DashboardOwner.jsx";
import UnitPage from "../components/UnitPage.jsx";


function App() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const [userData, setUserData] = useState(storedUserData || {});
  return (
    <Router>
      <Routes>
        <Route exact path="*" element={<LandingPage userData={userData}/>} />
        <Route path="/signup" element={<SignUp setUserData={setUserData} />} /> 
        <Route path="/login" element={<Login setUserData={setUserData}/>} />
        <Route path="/userDashboard" element={<DashboardOwner userData={userData} setUserData={setUserData} />} />
        <Route path="/unitPage" element={<UnitPage />} />
      </Routes>
    </Router>
  );
}

export default App;
