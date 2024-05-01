import React from "react";

export const Header = ({ property: propertyUnitsTuple }) => {
  return (
    <header id="mediumProfile">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="mediumProfile">
                <div className="mediumProfile-image">
                  <img src={propertyUnitsTuple.property.picture} />
                </div>
                <div className="mediumProfile-content">
                    <div>
                      <h2>{propertyUnitsTuple.property.address}</h2>
                      {propertyUnitsTuple.units.map((unit) => (
                        <div>
                          <h2>Unit #{unit.monthly_rent}</h2>
                        </div>
                      ))}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
