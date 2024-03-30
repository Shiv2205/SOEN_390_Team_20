import { useState, useEffect } from "react";
import { io } from "socket.io-client";

let webSocket;
let listeners = new Set();

const reducer = (action, setSocket) => {
  switch (action.type) {
    case "CONNECT":
      setSocket(webSocket);
      break;
    case "JOIN_ROOM":
      let { room_id, username } = action.payload;
      webSocket.emit("join_room", { room_id, username });
      setSocket(webSocket);
      break;
    case "DISCONNECT":
      /** To be implemented */
      return webSocket;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
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
  const [socket, setSocket] = useState(io(import.meta.env.VITE_SERVER_BASE_URL, {transports: ['websocket']}));

  const dispatch = (action, packet) => {
    reducer({ type: action, payload: packet }, setSocket);
  };

  return [socket, dispatch];
};
