import React from "react"; 
import { useNavigate } from "react-router-dom";

export const PropertiesInfo = ({properties, setProperties}) => {
  const navigate = useNavigate();
    return (
        <div id="about">
      <div className="container">
        {properties.map((property) => (
          <div key={property.id} className="row">
            <div className="col-xs-12 col-md-6">
              <img
                src={property.imageUrl}
                className="img-responsive"
                alt=""
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <div className="about-text">
              <h2>
                <a onClick={() => navigate("/unitpage", { state: { propertyData: property } })}>
                  {property.name}
                </a>
              </h2>
                <p>{property.address}</p>
                <p>Apartment: {property.unit}</p>
                <p>Parking Spot: {property.parkingSpot}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};
