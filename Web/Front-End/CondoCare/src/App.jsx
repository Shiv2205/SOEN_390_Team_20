import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Profile from "../components/Profile";
import PropertyView from "../components/PropertyView";
import PropertyRegistration from "../components/PropertyRegistration";
import LandingPage from "../components/LandingPage";
import DashboardOwner from "../components/DashboardOwner.jsx";
import RequestForm from "../components/RequestForm.jsx";
import UnitPage from "../components/UnitPage.jsx";

import ChatApp from "../components/ChatApp"; // Assuming you have a ChatApp component

function App() {
  const [userData, setUserData] = useState({});
  return (
    <Router>
      <Routes>
        <Route exact path="*" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp setUserData={setUserData} />} />
        <Route path="/login" element={<Login setUserData={setUserData} />} />
        <Route
          path="/profile"
          element={<Profile userData={userData} setUserData={setUserData} />}
        />
        <Route
          path="/propertyview"
          element={<PropertyView userData={userData} />}
        />
        <Route
          path="/propertyregistration"
          element={<PropertyRegistration userData={userData} />}
        />
        <Route
          path="/userDashboard"
          element={
            <DashboardOwner userData={userData} setUserData={setUserData} />
          }
        />
        <Route path="/requestService" element={<RequestForm />} />
        <Route path="/unitPage" element={<UnitPage userData={userData} setUserData={setUserData} />} />
        <Route path="/blog" element={<ChatApp />} />
      </Routes>
    </Router>
  );
}
  
export default App;
