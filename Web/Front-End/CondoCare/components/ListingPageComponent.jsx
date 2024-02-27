import React, { useEffect, useState } from 'react';
import ListingComponent from './ListingComponent';

const ListingsPageComponent = ({ userData, setView, views }) => {
    const [propertyList, setPropertyList] = useState([]);

    useEffect(() => {
        const fetchPropertyList = async () => {
            try {
                const response = await fetch("http://localhost:3000/properties/real-estate/company-assets", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // Add any other headers you need
                    },
                    body: JSON.stringify({ employee_id: userData.account_id }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch property list');
                }

                const data = await response.json();
                setPropertyList(data);
            } catch (error) {
                console.error('Error fetching property list:', error);
                // Handle error (e.g., show error message to the user)
            }
        };

        fetchPropertyList();
    }, [userData.account_id]);

    return (
        <div className="listings-page">
            <h1 style={{ color: 'black' }}>Property Listings</h1>
            {/* <img src={propertyList.data[0].picture}></img> */}
            {
                propertyList.data && propertyList.data.map(listing => (
                    <ListingComponent key={listing.id} data={listing} />
                ))
            }
        </div>
    );
};

export default ListingsPageComponent;
