import React from "react";
import "../src/PropertyView.css";

function PropertyView({userData}) {

    //Hardcoded property info for now
    const propertyInfo = {
        image: 'https://as2.ftcdn.net/v2/jpg/04/54/41/39/1000_F_454413960_pFnTAAxnhzrPWx8q3ehPGGqe7ERi7OsV.jpg',
        unitCount: 10,
        lockerCount: 20,
        parkingCount: 30,
        address: '123 St-Catherine',
    };

    //Lets take user data (account_id) and send to backend to use
    const {account_id} = userData;

    // Send a POST request to the backend with the account_id
    const postData = async (url='', data = {}) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    };

    //Call postData function with the account_id as data
    postData("http://localhost:3000/propertyview", {account_id})
    .then((data) => {
        console.log(data);
    });

    return(
        <div className="property-view-container">
            <div className="property-image-container">
            <img src={propertyInfo.image} alt="Property Image" className="property-image"/>
            </div>
            <div className="property-info">
            <h2>Property Information:</h2>
            <p><strong>Address:</strong> {propertyInfo.address}</p>
            <p><strong>Unit Count:</strong> {propertyInfo.unitCount}</p>
            <p><strong>Locker Count:</strong> {propertyInfo.lockerCount}</p>
            <p><strong>Parking Count:</strong> {propertyInfo.parkingCount}</p>
            </div>
        </div>
    );
}

export default PropertyView;