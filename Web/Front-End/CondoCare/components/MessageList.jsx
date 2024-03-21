
import React from 'react';
import Message from './Message';

const MessageList = () => {
  // Mock data for messages, replace with actual data from your backend
  const messages = [
    { id: 1, author: 'Instructor', text: 'Welcome to the course Soen 390-R!', timestamp: '9:22 AM' },
    { id: 2, author: 'Student', text: 'Thank you!', timestamp: '9:35 AM' },
    // ... more messages
  ];

  return (
    <section className="message-list">
      {messages.map(message => (
        <Message key={message.id} {...message} />
      ))}
    </section>
  );
};

export default MessageList;
