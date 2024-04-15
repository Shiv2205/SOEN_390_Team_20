import { useState, useEffect } from 'react';
import Sidebar from './ChatAppComponents/Sidebar';
import MessageList from './ChatAppComponents/MessageList';
import NewMessageForm from './ChatAppComponents/NewMessageForm';
import "../styles/ChatApp.css";
import { useStore } from '../store/store';
import { useSocket } from '../socket/socket';
import { getPostData } from './DashboardOwner';

const ChatApp = () => {
  const [showNewMessageForm, setShowNewMessageForm] = useState(false);
  const [state, dispatch] = useStore();
  const [postData, setPostData] = useState(state.postData);
  const socket = useSocket()[0];

  useEffect(() => {
    if (!socket) return; // Not connected yet

    socket.on("connected", (res) => {
      let { response } = JSON.parse(res);
      console.log(`Connected to server: ${response}`);

      socket.emit("join_room", { roomID: state.unitData.property_id, fullname: state.userData.fullname });

      socket.on('user_connected', (message) => {
        console.log(message);
      });

      socket.on("post_added", message => {
        getPostData(state.unitData.property_id, dispatch);
        setPostData(state.postData);
      })
    });

    // return () => {
    //   dispatch("DISCONNECT", "");
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
        <MessageList postData={postData} />
      )}
    </div>
  );
};

export default ChatApp;

