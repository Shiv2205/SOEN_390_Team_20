import { Server } from "socket.io";
import  { Server as HttpServer} from 'http';

const dev_client = 'http://localhost:5173';
//const prod_client = '';
const front_end = dev_client;

class WebSocket {
    readonly io: Server;

    constructor(httpServer: HttpServer) {
        this.io = new Server(httpServer, {
            cors: {
                origin: front_end,
                methods: ['GET', 'POST']
              }
        });
    }

    getIO(){
        if(!this.io) throw new Error('Websocket not initialized.');
        return this.io;
    }
};

export default WebSocket;