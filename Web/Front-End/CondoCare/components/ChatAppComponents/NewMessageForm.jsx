
import React, { useState } from 'react';

const NewMessageForm = ({ onNewMessage, onCancel }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNewMessage({
      post_id: Date.now().toString(), // Unique ID for the post
      content: text,
      creator_id: 'ManualEntry', // Placeholder for creator_id
      posted_at: new Date().toISOString(),
    });
    setText(''); // Clear the text area
  };

  const handleCancel = () => {
    setText(''); // Clear the text area
    if (onCancel) onCancel(); // Call onCancel prop if provided
  };

  return (
    <form onSubmit={handleSubmit} className="new-message-form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message here..."
        required
      />
      <div className="form-actions">
        <button type="submit">Send</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default NewMessageForm;


