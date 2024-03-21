import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import blank from "../src/assets/blank.webp"
import { Navigation } from "./LandingPageComponents/navigation";

function Profile( {userData, setUserData} ) {
    const navigate = useNavigate();
    const reader = new FileReader();
    
    useEffect(() => {
        // Fetch user data from localStorage upon component mount
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      }, []);
    
      return (
        <div style={{ overflow: 'hidden' }}>
            <Navigation />
            <div className="profile-container" style={{ marginTop: '110px'}}>
                <button onClick={() => navigate("/propertyview")}></button>
                <h2> Profile </h2>
                <div className="profile-info">
                    <img src={userData.profile_picture} alt='Profile' />
                    <div className="information" style={{ marginTop: "-40px" }}>
                        <h2 style={{ borderBottomStyle: "None", fontSize: "40px" }}> {userData.fullName} </h2>
                        <h4 style={{ marginTop: "-40px" }}> <i>Property Manager</i> </h4>
                        <h3 style={{ marginTop: "0px" }}><u>Contact</u></h3>
                        <h3 ><i>Email:</i> <u>{userData.email}</u></h3>
                        <h3><i>Number:</i> <u>{userData.phone}</u></h3>
                    </div>
                </div>
                <h2>Registration Keys</h2>

                
                <div>
                    <button onClick={() => {navigate("/propertyview")}}>Property View</button>
                    <button onClick={() => {navigate("/propertyregistration")}}>Add new property</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;