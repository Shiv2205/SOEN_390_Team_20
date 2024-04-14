
import React from 'react';

const Sidebar = ({ onNewMessage }) => {
  return (
    <aside className="sidebar">
      <h1>CondoCare</h1>
      <button onClick={onNewMessage}>New Message</button>
    </aside>
  );
};

export default Sidebar;

