import React from "react";

export const PropertiesInfo = () => {
    return (
        <div id="about">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        {" "}
                        <img src="img/prop1.jpg" className="img-responsive" alt="" />{" "}
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <div className="about-text">
                            <h2>StarLiving</h2>
                            <p>1234 Saint Joseph Boulevard East, Montreal, QC</p>
                            <p>Apartment: 345</p>
                            <p>Parking spot: 6B</p>
                            <h3>Finances</h3>
                            <div className="list-style">
                                <div className="col-lg-6 col-sm-6 col-xs-12">
                                    <ul>
                                        <li>Mars 2024 fees: 345/345$ </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
