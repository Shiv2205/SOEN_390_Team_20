import React from "react";

export const Header = ({ property }) => {
  return (
    <header id="mediumProfile">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="mediumProfile">
                <div className="mediumProfile-image">
                  <img src={property.imageUrl} />
                </div>
                <div className="mediumProfile-content">
                    <div>
                      <h2>{property.name}</h2>
                      <h2>Unit #{property.unit}</h2>
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
