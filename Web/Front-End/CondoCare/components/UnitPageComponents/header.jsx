import React from "react";

export const Header = ({ property }) => {
  // Ensure facilities is an array, if not available, provide dummy data
  const facilities = property.facilities || [
    { name: "Swimming Pool", description: "Open from 8:00 AM to 8:00 PM", size: "Medium", imageUrl: "https://images.unsplash.com/photo-1536745511564-a5fa6e596e7b?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Gym", description: "24/7 access", size: "Large", imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Parking", description: "Limited spots available", size: "Small", imageUrl: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

  return (
    <div>
      <header id="mediumProfile">
        <div className="intro">
          <div className="overlay">
            <div className="container">
              <div className="row">
                <div className="mediumProfile">
                  <div className="mediumProfile-image">
                    <img src={property.imageUrl} alt="Property" />
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
      <section id="facilities">
        <div className="container">
          <h3>Facilities Available:</h3>
          <div className="facility-list">
            {facilities.map((facility, index) => (
              <div key={index} className="facility-item">
                <img src={facility.imageUrl} alt={facility.name} className="facility-image" style={{ width: "500px", height: "300px" }} />
                <div className="facility-info">
                  <h4 style={{ color: "white" }}>{facility.name}</h4>
                  <p>{facility.description}</p>
                  <p>Size: {facility.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};