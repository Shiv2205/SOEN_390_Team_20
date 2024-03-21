
import React from 'react';
import Sidebar from './Sidebar';
import MessageList from './MessageList';
import "../styles/ChatApp.css";

const ChatApp = () => {
  return (
    <div className="chat-app">
      <Sidebar />
      <MessageList />
    </div>
  );
};

export default ChatApp;
