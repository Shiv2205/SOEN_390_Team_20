import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Profile from "../components/Profile";
import PropertyView from "../components/PropertyView";
import PropertyRegistration from "../components/PropertyRegistration";
import LandingPage from "../components/LandingPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import SmoothScroll from "smooth-scroll";

// export const scroll = new SmoothScroll('a[href*="#"]', {
//   speed: 1000,
//   speedAsDuration: true,
// });

function App() {
  const [userData, setUserData] = useState({});
  return (
    <Router>
      <Routes>
        <Route exact path="*" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/login" element={<Login setUserData={setUserData}/>} />
        <Route path="/profile" element={<Profile userData={userData}/>} />
        <Route path="/propertyview" element={<PropertyView userData={userData}/>} />
        <Route path="/propertyregistration" element={<PropertyRegistration userData={userData}/>} />
      </Routes>
    </Router>
  );
  // const views = {
  //   PROPERTYREGISTRATION: 5,
  //   PROPERTYVIEW: 4,
  //   PROPERTYPAGE: 3,
  //   PROFILE: 2,
  //   LOGIN: 1,
  //   SIGNUP: 0,
  //   LANDING: 6
  // };

  // const [view, setView] = useState(views.LANDING);
  // const [userData, setUserData] = useState({});

  // const renderView = () => {
  //   switch (view) {
  //     case views.SIGNUP:
  //       return <SignUp setView={setView} views={views} />;
  //     case views.LOGIN:
  //       return <Login setView={setView} views={views} setUserData={setUserData} />;
  //     case views.PROFILE:
  //       return <Profile userData={userData} setView={setView} views={views} />;
  //     case views.PROPERTYVIEW:
  //       return <PropertyView userData={userData}/>;
  //     case views.PROPERTYREGISTRATION:
  //       return<PropertyRegistration userData={userData}/>;
  //     case views.LANDING:
  //       return<LandingPage setView={setView} views={views}/>;
  //     default:
  //       return <LandingPage setView={setView} views={views} />;
  //   }
  // };

  // return renderView();
}

export default App;