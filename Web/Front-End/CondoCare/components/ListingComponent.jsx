import React from 'react';
import '../styles/ListingComponent.css';
import BellIcon from '../components/BellIcon';

const handleBellClick = () => {
    setIsNotificationsVisible(true);
  };

function ListingComponent(data) {
    return (
        <div className="listing-card">
            <BellIcon onClick={handleBellClick} />
            <img className="listing-image" src={data.data.picture} alt="Property12" />
            <div className="listing-details">
                <p className="listing-info">Address: {data.data.address}</p>
                <p className="listing-info">Unit Count: {data.data.unit_count}</p>
                <p className="listing-info">Locker Count: {data.data.locker_count}</p>
            </div>
        </div>
    );
};

export default ListingComponent;
