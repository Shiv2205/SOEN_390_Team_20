import React, { useState, useEffect } from "react";
import "../styles/PropertyView.css";
import BellIcon from '../components/BellIcon';

function PropertyView({ userData }) {
  const [propertyInfo, setPropertyInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { account_id } = userData;
      const response = await fetch(
        "http://localhost:3000/properties/real-estate/company-assets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ employee_id: account_id }),
        }
      );
      const data = await response.json();

      //Received property information
      setPropertyInfo({
        image: data.data[0].picture,
        unitCount: data.data[0].unit_count,
        lockerCount: data.data[0].locker_count,
        parkingCount: data.data[0].parking_count,
        address: data.data[0].address,
      });
    };

    fetchData();
  }, [userData]);

  if (!propertyInfo) {
    return <div>Loading...</div>;
  }

  const handleBellClick = () => {
    setIsNotificationsVisible(true);
  };

  return (
    <div className="property-view-container">
      <BellIcon onClick={handleBellClick} />
      <div className="property-card">
        <div className="property-image-container">
            <p>{propertyInfo.address}</p>
            <img src={propertyInfo.image} alt="Property Image" className="property-image" />
        </div>
        <div className="property-info">
          <p><strong>Unit Count:</strong> {propertyInfo.unitCount}</p>
          <p><strong>Locker Count:</strong> {propertyInfo.lockerCount}</p>
          <p><strong>Parking Count:</strong> {propertyInfo.parkingCount}</p>
        </div>
      </div>
    </div>
  );
}

export default PropertyView;