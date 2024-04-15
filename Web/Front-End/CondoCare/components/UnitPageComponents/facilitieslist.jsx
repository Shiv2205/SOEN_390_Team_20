import React, { useState } from "react";

const FacilityManagementPage = () => {
  // State to manage facilities data
  const [facilities, setFacilities] = useState([]);

  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    size: "",
    imageUrl: "",
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new facility to facilities array
    setFacilities([...facilities, formData]);
    // Reset form data
    setFormData({
      name: "",
      description: "",
      size: "",
      imageUrl: "",
    });
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle facility deletion
  const handleDelete = (index) => {
    const updatedFacilities = [...facilities];
    updatedFacilities.splice(index, 1);
    setFacilities(updatedFacilities);
  };

  return (
    <div>
      <h1>Facility Management Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Facility Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Size:
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Facility</button>
      </form>
      <h2>Facilities:</h2>
      <ul>
        {facilities.map((facility, index) => (
          <li key={index}>
            <div>
              <img src={facility.imageUrl} alt={facility.name} />
              <div>
                <h3>{facility.name}</h3>
                <p>{facility.description}</p>
                <p>Size: {facility.size}</p>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacilityManagementPage;