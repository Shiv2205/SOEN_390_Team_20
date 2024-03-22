import React, { useState, useEffect } from "react";

export const MiniProfile = ({ userData, setUserData }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState(userData);

  useEffect(() => {
    setEditedUserData(userData); // Reset editedUserData whenever userData changes
  }, [userData]);

  const handleEdit = () => {
    setEditMode(!editMode);
    // Reset editedUserData to userData when entering edit mode
    if (!editMode) setEditedUserData(userData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveChanges = () => {
    localStorage.setItem("userData", JSON.stringify(editedUserData));
    setUserData(editedUserData); // Update userData with editedUserData
    setEditMode(false); // Exit edit mode
  };

  return (
    <header id="miniProfile">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="miniProfile">
                <div className="miniProfile-image">
                  <img src="/img/testimonials/05.jpg" />
                  <button
                    type="button"
                    onClick={handleEdit}
                    style={{ marginTop: "10px" }}
                    className="btn btn-outline-primary me-1 flex-grow-1"
                  >
                    {editMode ? "Cancel" : "Edit"}
                  </button>
                </div>
                <div className="miniProfile-content">
                  {editMode ? (
                    <div>
                      <input
                        placeholder="Full Name"
                        name="fullName"
                        value={editedUserData.fullName}
                        onChange={handleInputChange}
                      /><br />
                      <input
                        placeholder="Email"
                        name="email"
                        value={editedUserData.email}
                        onChange={handleInputChange}
                      /><br />
                      <input
                        placeholder="Address"
                        name="address"
                        value={editedUserData.address}
                        onChange={handleInputChange}
                      /><br />
                      <input
                        placeholder="Phone Number"
                        name="phone"
                        value={editedUserData.phone}
                        onChange={handleInputChange}
                      /><br />
                      <button
                        type="button"
                        onClick={saveChanges}
                        style={{ marginTop: "10px" }}
                        className="btn btn-primary me-1 flex-grow-1"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p>{userData.fullName}</p>
                      <p>{userData.email}</p>
                      <p>{userData.address}</p>
                      <p>{userData.phone}</p>
                    </div>
                  )}
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
