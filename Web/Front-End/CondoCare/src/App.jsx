import { useState } from "react";
import { useEffect } from "react";

import "./App.css";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Profile from "../components/Profile";
import PropertyPage from "../components/ListingPageComponent"
import PropertyView from "../components/PropertyView";
import PropertyRegistration from "../components/PropertyRegistration";

function App() {
  const views = {
    PROPERTYREGISTRATION: 5,
    PROPERTYVIEW: 4,
    PROPERTYPAGE: 3,
    PROFILE: 2,
    LOGIN: 1,
    SIGNUP: 0,
  };

  const [view, setView] = useState(views.SIGNUP);
  const [userData, setUserData] = useState({});

  const renderView = () => {
    switch (view) {
      case views.SIGNUP:
        return <SignUp setView={setView} views={views} />;
      case views.LOGIN:
        return <Login setView={setView} views={views} setUserData={setUserData} />;
      case views.PROFILE:
        return <Profile userData={userData} setView={setView} views={views} />;
      case views.PROPERTYVIEW:
        return <PropertyView userData={userData}/>;
      case views.PROPERTYREGISTRATION:
        return<PropertyRegistration userData={userData}/>;
      default:
        return <SignUp setView={setView} views={views} />;
    }
  };

  return renderView();
}

export default App;