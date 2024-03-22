import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Profile from "../components/Profile";
//import PropertyPage from "../components/ListingPageComponent";
import PropertyView from "../components/PropertyView";
import PropertyRegistration from "../components/PropertyRegistration";
import LandingPage from "../components/LandingPage";
import { useStore } from "../store/store";
// import SmoothScroll from "smooth-scroll";

// export const scroll = new SmoothScroll('a[href*="#"]', {
//   speed: 1000,
//   speedAsDuration: true,
// });

function App() {
  const views = {
    PROPERTYREGISTRATION: 5,
    PROPERTYVIEW: 4,
    PROPERTYPAGE: 3,
    PROFILE: 2,
    LOGIN: 1,
    SIGNUP: 0,
    LANDING: 6,
  };

  const [view, setView] = useState(views.LANDING);
  const [userData, setUserData] = useState({});
  const [store, addToStore] = useStore();

  useEffect(() => {
    addToStore({ view, setView, views });
  }, [])
  

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      addToStore({user_data: userData});
      if (
        userData.account_type === "Owner" ||
        userData.account_type === "Renter"
      ) {
        
        const getUserUnit = async () => {
          return await fetch(
            "http://localhost:3000/properties/units/get-user-unit",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData.account_id),
            }
          );
        };

        const unitResults = getUserUnit().then(res => res.json());

        addToStore({ unitDetails: unitResults.data });
      }
    }
  }, [userData]);

  const renderView = () => {
    switch (view) {
      case views.SIGNUP:
        return <SignUp setView={setView} views={views} />;
      case views.LOGIN:
        return (
          <Login setView={setView} views={views} setUserData={setUserData} />
        );
      case views.PROFILE:
        return <Profile userData={userData} setView={setView} views={views} />;
      case views.PROPERTYVIEW:
        return <PropertyView userData={userData} />;
      case views.PROPERTYREGISTRATION:
        return <PropertyRegistration userData={userData} />;
      case views.LANDING:
        return <LandingPage setView={setView} views={views} />;
      default:
        return <LandingPage setView={setView} views={views} />;
    }
  };

  return renderView();
}

export default App;
