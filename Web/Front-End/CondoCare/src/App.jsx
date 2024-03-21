import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Profile from "../components/Profile";
import PropertyPage from "../components/ListingPageComponent";
import PropertyView from "../components/PropertyView";
import PropertyRegistration from "../components/PropertyRegistration";
import LandingPage from "../components/LandingPage";
import ChatApp from "../components/ChatApp"; // Assuming you have a ChatApp component

function App() {
  const [userData, setUserData] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login setUserData={setUserData} />} />
        <Route path="profile" element={<Profile userData={userData} />} />
        <Route path="property" element={<PropertyPage />} />
        <Route path="view-property" element={<PropertyView userData={userData} />} />
        <Route path="register-property" element={<PropertyRegistration userData={userData} />} />
        <Route path="blog" element={<ChatApp />} />
        {/* ...other routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
