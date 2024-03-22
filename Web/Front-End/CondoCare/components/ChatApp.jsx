
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MessageList from './MessageList';
import NewMessageForm from './NewMessageForm';
import "../styles/ChatApp.css";

const ChatApp = () => {
  const [showNewMessageForm, setShowNewMessageForm] = useState(false);

  const handleNewMessageToggle = () => {
    setShowNewMessageForm(!showNewMessageForm);
  };

  return (
    <div className="chat-app">
      <Sidebar onNewMessage={handleNewMessageToggle} />
      {showNewMessageForm ? (
        <NewMessageForm onClose={handleNewMessageToggle} />
      ) : (
        <MessageList />
      )}
    </div>
  );
};

export default ChatApp;

