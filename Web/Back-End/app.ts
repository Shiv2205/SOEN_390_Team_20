import app from './index';
import { createServer } from "http";
import WebSocket from './WebSocket/WebSocket';
import { RoomMaster } from './WebSocket/roomMaster';
import { Socket } from 'socket.io'

const port = process.env.PORT || 3000;

const server = createServer(app);

const socketIO = new WebSocket(server).getIO();
const roomsHandler = new RoomMaster();

interface ClientData {
  roomID: string;
  fullname: string;
}

socketIO.on("connection", (socket: Socket) => {

  socket.emit("connected", JSON.stringify({ response: "Websocket connection successful" }));

  socket.on("join_room", (userData: ClientData) => {
    console.log("join_room: ", userData);
    const { roomID, fullname } = userData;
    socket.join(roomID);
    roomsHandler.joinRoom(roomID, fullname);

    socketIO.to(roomID).emit("user_connected", `${roomsHandler.getUsername(fullname)} has joined the room.`);
  });
});

// Start the server
server.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});

// Handle SIGINT signal
process.on('SIGINT', () => {
  // Close any resources like database connections
  // For example:
  // db.close();

  // Close the Express server
  server.close(() => {
    console.log('Express server closed');
    // Exit the process
    process.exit();
  });
});