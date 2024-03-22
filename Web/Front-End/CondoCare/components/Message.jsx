
import React from 'react';

const Message = ({ author, timestamp, children }) => {
  const formattedTimestamp = new Date(timestamp).toLocaleString();
  
  return (
    <div className="message">
      <div className="message-greeting">Welcome to CondoCare chat!</div>
      <div className="message-author">{author}</div>
      <div className="message-timestamp">{formattedTimestamp}</div>
      {children && <p className="message-text">{children}</p>}
    </div>
  );
};

export default Message;






