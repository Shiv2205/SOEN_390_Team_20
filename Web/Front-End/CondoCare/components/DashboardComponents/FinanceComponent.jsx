import React, { useState, useEffect } from 'react';
import '../../styles/finance.css'; // Import the style sheet


function FinanceComponent({ accountId }) {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const SERVER = import.meta.env.VITE_SERVER_BASE_URL;


    useEffect(() => {
        async function fetchUnits() {
            const response = await fetch(`${SERVER}/properties/get-units-by-account`, {
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
        <div className="finance-container">
            <h1 className="finance-header">Finances</h1>
            {properties.map((unit, index) => (
                <div key={index} className="finance-unit">
                    <h3>Property: {unit.address}</h3>
                    <h4>Unit {unit.unit_id}</h4>
                    <p>Total Condo Fee: ${calculateCondoFee(unit)}</p>
                    <p>Remaining Balance: ${calculateRemainingBalance(unit)}</p>
                </div>
            ))}
        </div>
    );

    function calculateCondoFee(unit) {
        const baseFee = unit.size * unit.fee_per_square_foot/100;
        const parkingFee = unit.parking_spot ? unit.parking_spot_fee : 0;
        return baseFee + parkingFee;
    }

    function calculateRemainingBalance(unit) {
        return  unit.condo_balance; // condo_balance is the amount paid
    }
}



export default FinanceComponent;
