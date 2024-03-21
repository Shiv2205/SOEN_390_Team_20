
import React from 'react';

const Message = ({ author, text, timestamp }) => {
  return (
    <div className="message">
      <span className="message-author">{author}</span>
      <span className="message-timestamp">{timestamp}</span>
      <p className="message-text">{text}</p>
    </div>
  );
};

export default Message;
