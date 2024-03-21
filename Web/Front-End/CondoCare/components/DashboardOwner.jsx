import React, { useState, useEffect } from "react";
import "../styles/DashboardOwner.css";
import { Navigation } from "./DashboardComponents/navigation";
import {PropertiesInfo} from "./DashboardComponents/propertiesInfo.jsx";
import JsonData from "./LandingPageComponents/data.json";
import {MiniProfile} from "./DashboardComponents/miniProfile.jsx";
const DashboardOwner = ({ userData, setView, views}) => {

    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);

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

    return (
        <div className="dashboard-owner">
            <Navigation views={views}  setView={setView} />
            <MiniProfile views={views}  setView={setView} />
            <PropertiesInfo />

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
