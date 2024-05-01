import React, { useState, useEffect } from "react";
import "../styles/DashboardOwner.css";
import { Navigation } from "./LandingPageComponents/navigation";
import { PropertiesInfo } from "./DashboardComponents/propertiesInfo.jsx";
import JsonData from "./LandingPageComponents/data.json";
import { MiniProfile } from "./DashboardComponents/miniProfile.jsx";
import { useStore } from "../store/store.js";
import ExampleWithProviders from "./UnitPageComponents/Requests";

const DashboardOwner = ({ userData, setUserData }) => {
  const [propertyData, setPropertyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        // Make API call to fetch property data
        const data = await getUnitData(userData.account_id);
        setPropertyData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    fetchPropertyData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.account_id]);

  // Fetch user properties from serever
  // const propertyData = [
  //   {
  //     id: 1,
  //     name: "StarLiving",
  //     address: "1234 Saint Joseph Boulevard East, Montreal, QC",
  //     unit: "345",
  //     parkingSpot: "6B",
  //     finances: {
  //       fees: "Mars 2024 fees: 345/345$",
  //     },
  //     imageUrl: "img/prop1.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Garden Oasis",
  //     address: "5678 Garden Street, Montreal, QC",
  //     unit: "101",
  //     parkingSpot: "2A",
  //     finances: {
  //       fees: "Mars 2024 fees: 300/345$",
  //     },
  //     imageUrl: "img/portfolio/p2_small.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Sunset View",
  //     address: "91011 Sunset Avenue, Montreal, QC",
  //     unit: "25",
  //     parkingSpot: "9C",
  //     finances: {
  //       fees: "Mars 2024 fees: 250/345$",
  //     },
  //     imageUrl: "img/portfolio/p8_small.jpg",
  //   },
  //   {
  //     id: 4,
  //     name: "Lakefront Living",
  //     address: "121314 Lakeside Road, Montreal, QC",
  //     unit: "10",
  //     parkingSpot: "N/A",
  //     finances: {
  //       fees: "Mars 2024 fees: 400/345$",
  //     },
  //     imageUrl: "img/portfolio/p4_small.jpg",
  //   },
  //   {
  //     id: 5,
  //     name: "Urban Retreat",
  //     address: "151617 Urban Street, Montreal, QC",
  //     unit: "3",
  //     parkingSpot: "4D",
  //     finances: {
  //       fees: "Mars 2024 fees: 280/345$",
  //     },
  //     imageUrl: "img/portfolio/p5_small.jpg",
  //   },
  // ];


  return (
    <div className="dashboard-owner">
      <Navigation />
      <MiniProfile userData={userData} setUserData={setUserData} />
      {userData && userData.account_type && userData.account_id ? (
      <>
        {(() => {
          switch (userData.account_type) {
            case "Owner":
            case "Renter":
            case "Public":
              return (
                <>
                  {loading ? (<p>Loading...</p>) : (
                    // Render PropertiesInfo component with fetched property data
                    <PropertiesInfo properties={propertyData} />
                  )}
                </>
              );
            default:
              return <ExampleWithProviders id={userData.account_id} isAdmin={true}/>;
          }
        })()}
      </>
    ) : (
      // Render a loading indicator or message while userData is empty
      <p>Loading...</p>
    )}
    </div>
  );
  
};

export default DashboardOwner;

async function getUnitData(occupant_id) {
  const SERVER = import.meta.env.VITE_SERVER_BASE_URL;
  const url = `${SERVER}/properties/units/get-user-unit`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({occupant_id : occupant_id}),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user properties');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    // Handle errors gracefully
    throw new Error('Error fetching data: ' + error.message);
  }
}

export function getPostData(property_id, dispatch) {
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
