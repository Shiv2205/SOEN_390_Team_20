
import React from 'react';
import blank from '../src/assets/blank.webp' 

const Message = ({ author, timestamp, text }) => {
  const formattedTimestamp = new Date(timestamp).toLocaleString();
  
  return (
    <div className="discord-message">
      <img src={blank} className="discord-message-avatar" alt="Avatar" />
      <div className="discord-message-content">
        <div className="discord-message-author">{author}</div>
        {text && <p className="discord-message-text">{text}</p>}
        <div className="discord-message-timestamp">{formattedTimestamp}</div>
      </div>
    </div>
  );
};

export default Message;

/**
 *   return (
    <div className="message">
      <div className="message-greeting">Welcome to CondoCare chat!</div>
      <div className="message-author">{author}</div>
      <div className="message-timestamp">{formattedTimestamp}</div>
      {children && <p className="message-text">{children}</p>}
    </div>
  );
 */




