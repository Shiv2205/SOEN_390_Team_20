import React from "react"; 
import { useNavigate } from "react-router-dom";

export const PropertiesInfo = ({properties}) => {
  const navigate = useNavigate();
  console.log(properties[0].property.picture);
  return (
    <div id="about">
      <div className="container">
        {properties.map((propertyUnitsTuple) => (
          <div key={propertyUnitsTuple.units.unit_id} className="row">
            <div className="col-xs-12 col-md-6">
              <img
                src={propertyUnitsTuple.property.picture}
                className="img-responsive"
                alt=""
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <div className="about-text">
              <h2>
                <a onClick={() => navigate("/unitpage", { state: { propertyData: propertyUnitsTuple } })}>
                  {propertyUnitsTuple.property.address}
                </a>
              </h2>
              <div>
                  {propertyUnitsTuple.units.map((unit) => (
                    <div>
                      <p>Apartment: {unit.monthly_rent}</p>
                      <h3>Finances</h3>
                      <div className="list-style">
                        <div className="col-lg-6 col-sm-6 col-xs-12">
                          <ul>
                            <li>Balance : {unit.condo_balance}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};
