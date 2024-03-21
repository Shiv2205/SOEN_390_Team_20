
import React from 'react';
import "../styles/ChatApp.css";

const Sidebar = ({ onNewMessage }) => {
  // Here you would fetch the channels and DMs from your API or state

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">CondoCare</h1>
        <button className="new-message-btn" onClick={onNewMessage}>
          New Message
        </button>
      </div>
      {/* List of channels and DMs */}
    </aside>
  );
};

export default Sidebar;

