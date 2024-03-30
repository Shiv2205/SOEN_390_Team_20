
import React from 'react';
import Message from './Message';
import { useStore } from '../store/store';

const MessageList = () => {

  const [state, dispatch] = useStore();
  // Mock data structure, it should match the prop names expected by the Message component

  const { postData } = state;
  console.log(postData);
  const messages = [
    {
      post_id: '1',
      content: 'Welcome to CondoCare chat!',
      creator_id: 'John Doe',
      posted_at: '2023-03-20T14:00:00Z',
    },
    {
      post_id: '2',
      content: 'Welcome to CondoCare chat!',
      creator_id: 'Alexander Doe',
      posted_at: '2023-03-20T14:00:00Z',
    },
    {
      post_id: '3',
      content: 'Welcome to CondoCare chat!',
      creator_id: 'James Doe',
      posted_at: '2023-03-20T14:00:00Z',
    },
    {
      post_id: '4',
      content: 'Welcome to CondoCare chat!',
      creator_id: 'Jeremiah Doe',
      posted_at: '2023-03-20T14:00:00Z',
    },
  ];

  return (
    <div className="message-list">
      {postData.map((msg) => (
        <Message
          key={msg.post_id}
          timestamp={msg.posted_at}
          author={msg.creator_name}
          text={msg.content}
         
        />
      ))}
    </div>
  );
};

export default MessageList;







