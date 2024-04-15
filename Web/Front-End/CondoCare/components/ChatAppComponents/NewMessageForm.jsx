
import React, { useState } from 'react';
import { useStore } from '../../store/store';
import { useSocket } from '../../socket/socket';

const NewMessageForm = ({ onNewMessage, onCancel }) => {
  const [text, setText] = useState('');
  const state = useStore()[0];
  const [socket, dispatch] = useSocket();

  /**
   *  property_id,
    creator_id,
    content,
    replied_to = "",
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const { unitData } = state;
    const postData = {
      property_id: unitData.property_id,
      creator_id: unitData.occupant_id,
      content: text
    };

    submitNewPost(postData);
    dispatch("NEW_POST", unitData.property_id)
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


const submitNewPost = (postData) => {
  const SERVER = import.meta.env.VITE_SERVER_BASE_URL;
  fetch(`${SERVER}/properties/posts/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  }).then(res => res.json()).then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  })
}

