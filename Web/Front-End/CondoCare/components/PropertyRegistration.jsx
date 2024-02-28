import React,  { useState } from 'react';
import "../src/PropertyRegistration.css";


function PropertyRegistration() {

    const [formData, setFormData] = useState({
        unit_count: '',
        locker_count: '',
        parking_count: '',
        address: '',
        picture: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here, such as sending data to a server
        console.log(formData);
    };
    return (

        <form onSubmit={handleSubmit}>
            <h2>Add a new property</h2>
            <div>
                <label>Unit Count</label>
                <input
                    type="number"
                    name="unit_count"
                    value={formData.unit_count}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Locker Count</label>
                <input
                    type="number"
                    name="locker_count"
                    value={formData.locker_count}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Parking Count</label>
                <input
                    type="number"
                    name="parking_count"
                    value={formData.parking_count}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Picture (URL)</label>
                <input
                    type="text"
                    name="picture"
                    value={formData.picture}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Register Property</button>
        </form>
    );
}

export default PropertyRegistration;