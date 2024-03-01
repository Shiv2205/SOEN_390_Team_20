import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const BellIcon = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    'You have a new message',
    'Your property has been approved',
    'There was an error processing your payment'
  ]);

  const bellIconRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellIconRef.current && !bellIconRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="bell-icon-container">
      <div onClick={handleClick} ref={bellIconRef} className="bell-icon">
        <FontAwesomeIcon icon={faBell} style={{ color: 'black' }} />
      </div>
      {showNotifications && (
        <div className="notification-list">
          <h3>Notifications</h3>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BellIcon;