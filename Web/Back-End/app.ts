import app from './index';
import WebSocket from './WebSocket/WebSocket';
import { Socket } from 'socket.io'

const port = process.env.PORT || 3000;

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


const socketIO = new WebSocket(server).getIO();

socketIO.on("connection", (socket: Socket) => {
  let connRes = { response: "Websocket connection successful" };
  console.log(connRes);
  socket.emit("connected", JSON.stringify(connRes));

  socket.on("test", (message: string) => {
    console.log(socket.id + `: ${message}`);
  });
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