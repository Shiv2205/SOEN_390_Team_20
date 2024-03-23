import { useState, useEffect } from "react";
import { io } from "socket.io-client";

/**
 * The useSocket function creates and returns a socket connection to a specified server using
 * WebSockets.
 * @returns The `useSocket` custom hook is returned. It returns the socket object created using
 * Socket.IO to connect to back-end(dev) server at `http://localhost:3000` with WebSocket transport.
 */
export const useSocket = () => {
    const socket = useState(io("http://localhost:3000", {transports: ['websocket']}))[0];
    return socket;
}
