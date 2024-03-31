import { useState, useEffect } from 'react';
import Sidebar from './ChatAppComponents/Sidebar';
import MessageList from './ChatAppComponents/MessageList';
import NewMessageForm from './ChatAppComponents/NewMessageForm';
import "../styles/ChatApp.css";
import { useStore } from '../store/store';
import { useSocket } from '../socket/socket';

const ChatApp = () => {
  const [showNewMessageForm, setShowNewMessageForm] = useState(false);
  const state = useStore()[0];
  const [socket, dispatch] = useSocket();

  useEffect(() => {
    if (!socket) return; // Not connected yet

    socket.on("connected", (res) => {
      let { response } = JSON.parse(res);
      console.log(`Connected to server: ${response}`);

      socket.emit("join_room", { roomID: state.unitData.property_id, fullname: state.userData.fullname });

      socket.on('user_connected', (message) => {
        console.log(message);
      });
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, [socket]);
  

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

