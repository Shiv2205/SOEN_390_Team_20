import React from "react";

export const PropertiesInfo = ({properties, setProperties}) => {
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
                <h2>{property.name}</h2>
                <p>{property.address}</p>
                <p>Apartment: {property.unit}</p>
                <p>Parking Spot: {property.parkingSpot}</p>
                <h3>Finances</h3>
                <div className="list-style">
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <ul>
                      <li>{property.finances.fees}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};
