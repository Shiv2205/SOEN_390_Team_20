import React, { useState, useEffect } from "react";
import "../styles/DashboardOwner.css";
import { Navigation } from "./LandingPageComponents/navigation";
import { PropertiesInfo } from "./DashboardComponents/propertiesInfo.jsx";
import JsonData from "./LandingPageComponents/data.json";
import { MiniProfile } from "./DashboardComponents/miniProfile.jsx";
import { useStore } from "../store/store.js";

const DashboardOwner = ({ userData, setUserData }) => {
  const [landingPageData, setLandingPageData] = useState({});
  const [properties, setProperties] = useState([]);
  const [state, dispatch] = useStore();

  // Store user data in localStorage
  localStorage.setItem("userData", JSON.stringify(state.userData));

  // Fetch user properties from serever
  const propertyData = [
    {
      id: 1,
      name: "StarLiving",
      address: "1234 Saint Joseph Boulevard East, Montreal, QC",
      unit: "345",
      parkingSpot: "6B",
      finances: {
        fees: "Mars 2024 fees: 345/345$",
      },
      imageUrl: "img/prop1.jpg",
    },
    {
      id: 2,
      name: "Garden Oasis",
      address: "5678 Garden Street, Montreal, QC",
      unit: "101",
      parkingSpot: "2A",
      finances: {
        fees: "Mars 2024 fees: 300/345$",
      },
      imageUrl: "img/portfolio/p2_small.jpg",
    },
    {
      id: 3,
      name: "Sunset View",
      address: "91011 Sunset Avenue, Montreal, QC",
      unit: "25",
      parkingSpot: "9C",
      finances: {
        fees: "Mars 2024 fees: 250/345$",
      },
      imageUrl: "img/portfolio/p8_small.jpg",
    },
    {
      id: 4,
      name: "Lakefront Living",
      address: "121314 Lakeside Road, Montreal, QC",
      unit: "10",
      parkingSpot: "N/A",
      finances: {
        fees: "Mars 2024 fees: 400/345$",
      },
      imageUrl: "img/portfolio/p4_small.jpg",
    },
    {
      id: 5,
      name: "Urban Retreat",
      address: "151617 Urban Street, Montreal, QC",
      unit: "3",
      parkingSpot: "4D",
      finances: {
        fees: "Mars 2024 fees: 280/345$",
      },
      imageUrl: "img/portfolio/p5_small.jpg",
    },
  ];

  useEffect(() => {
    const appUserData = state.userData ? state.userData : null

    if (appUserData) {
      if (
       ( appUserData.account_type === "Owner" ||
        appUserData.account_type === "Renter") && !state.unitData
      ) {
        getUnitData(appUserData.account_id, dispatch);
      }

      if (appUserData.account_type === "Employee") {
        /** TO IMPLEMENT */
      }
    }

    setProperties(propertyData);
    setLandingPageData(JsonData);
    const storedUserData = appUserData; //localStorage.getItem("userData");
    if (storedUserData) {
      //setUserData(JSON.parse(storedUserData));
    }
  }, [state.userData]);

  // // Placeholder data - replace with actual data
  // const properties = [
  //     { id: 1, name: 'Property 1', address: '123 Main St', imageUrl: 'https://via.placeholder.com/100' },
  //     { id: 2, name: 'Property 2', address: '456 Oak St', imageUrl: 'https://via.placeholder.com/100' },
  //     // More properties...
  // ];
  //
  // // Placeholder for user data
  // const user = {
  //     name: 'John Doe',
  //     imageUrl: 'https://via.placeholder.com/50'
  // };
  console.log(state.userData)

  return (
    <div className="dashboard-owner">
      <Navigation />
      {state.userData ? (
        <>
          <MiniProfile userData={state.userData} setUserData={setUserData} />
          <PropertiesInfo
            properties={properties}
            setProperties={setProperties}
          />
        </>
      ) : (
        "Loading..."
      )}

      {/*<div className="property-list">*/}
      {/*    {properties.map(property => (*/}
      {/*        <div key={property.id} className="property-item">*/}
      {/*            <div className="property-info">*/}
      {/*                <h3>{property.name}</h3>*/}
      {/*                <p>{property.address}</p>*/}
      {/*            </div>*/}
      {/*            <img src={property.imageUrl} alt="Property" />*/}
      {/*        </div>*/}
      {/*    ))}*/}
      {/*</div>*/}
    </div>
  );
};

export default DashboardOwner;

function getUnitData(occupant_id, dispatch) {
  fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/properties/units/get-user-unit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any other headers you need
    },
    body: JSON.stringify({occupant_id: occupant_id}),
  })
    .then((response) => response.json())
    .then((res) => {
      // Handle the response from the server
      dispatch("CREATE", { unitData: { ...res.data } });
      getPostData(res.data.property_id, dispatch);
    })
    .catch((error) => {
      // Handle error
      console.error("Error:", error);
    });
}

function getPostData(property_id, dispatch) {
  fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/properties/posts/property-channel-posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any other headers you need
    },
    body: JSON.stringify({property_id: property_id}),
  })
    .then((response) => response.json())
    .then((res) => {
      // Handle the response from the server
      dispatch("CREATE", { postData: res.data  });
    })
    .catch((error) => {
      // Handle error
      console.error("Error:", error);
    });
}
