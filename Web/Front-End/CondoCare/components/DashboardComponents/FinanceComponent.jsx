import React, { useState, useEffect } from 'react';

function FinanceComponent({ accountId }) {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const SERVER = import.meta.env.VITE_SERVER_BASE_URL;


    useEffect(() => {
        async function fetchUnits() {
            const response = await fetch(`${SERVER}/properties/units/get-user-unit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ account_id: accountId })
            });
            const data = await response.json();
            if (response.ok) {
                setProperties(data.data); //data.data contains an array of properties each with nested units
            } else {
                console.error('Failed to fetch unit data');
            }
            setLoading(false);
        }

        fetchUnits();
    }, [accountId]);

    if (loading) {
        return <div>Loading finance data...</div>;
    }

    return (
        <div>
            {properties.map((property, index) => (
                <div key={index}>
                    <h2>Property: {property.property.address}</h2>
                    {property.units.map((unit, idx) => (
                        <div key={idx}>
                            <h3>Unit {unit.unit_id}</h3>
                            <p>Total Condo Fee: ${calculateCondoFee(unit, property.property)}</p>
                            <p>Paid: ${unit.condo_fee}</p>
                            <p>Remaining Balance: ${calculateRemainingBalance(unit, property.property)}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );

    function calculateCondoFee(unit,  property) {
        const baseFee = unit.size * property.fee_per_square_foot;
        const parkingFee = unit.parking_spot ? property.parking_spot_fee : 0;
        return baseFee + parkingFee;
    }

    function calculateRemainingBalance(unit, property) {
        const totalFee = calculateCondoFee(unit, property);
        return totalFee - unit.condo_balance; // condo_balance is the amount paid
    }
}

export default FinanceComponent;
