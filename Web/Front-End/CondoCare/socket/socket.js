import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const SERVER = import.meta.env.VITE_SERVER_BASE_URL;
let webSocket = getConnection();
let listeners = new Set();

function getConnection() {
    return io(SERVER, {transports: ['websocket']});
}

const reducer = (action, setSocket) => {
  switch (action.type) {
    case "CONNECT":
      webSocket = getConnection();
      break;
    case "JOIN_ROOM":
      let { room_id, username } = action.payload;
      webSocket.emit("join_room", { room_id, username });
      break;
    case "NEW_POST":
      webSocket.emit("new_post", action.payload);
      console.log("New post sent to server");

      break;
    case "DISCONNECT":
      setSocket(webSocket.disconnect());
      console.log("Disconnected from server");
      break;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
  setSocket(webSocket);
};

/**
 * Custom React hook that provides a WebSocket connection and dispatch method.
 *
 * Returns an array with the WebSocket instance and a dispatch function:
 *
 * - socket: The WebSocket instance to send/receive messages.
 *
 * - dispatch: A function to dispatch actions that manipulate the socket.
 *   Supported actions:
 *     - JOIN_ROOM: Joins a room on the socket.
 *     - DISCONNECT: Disconnects the socket.
 *
 * Internally manages socket state and notifies listeners on changes.
 * 
 * @returns 
 * ```js
 * return [socket, dispatch];
 * ```
 * 
 * @example
 * ```js
 * const [socket, dispatch] = useSocket();
 * ```
 */
export const useSocket = () => {
  const [socket, setSocket] = useState(io(SERVER, {transports: ['websocket']}));
  // useEffect(() => {
  //   const listener = () => {
  //     setSocket(webSocket);
  //   };
  //   listeners.add(listener);
  //   listener(); // in case it's already changed
  //   return () => listeners.delete(listener); // cleanup
  // }, []);

  const dispatch = (action, packet) => {
    reducer({ type: action, payload: packet }, setSocket);
  };

  return [socket, dispatch];
};
