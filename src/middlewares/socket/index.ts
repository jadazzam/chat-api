import express from 'express';
import {createServer, Server as HTTPServer} from "http";
import {Server as SocketServerIO} from "socket.io";
import AuthMiddleware from "../auth";

class SocketServer {
    private app: express.Application;
    private httpServer: HTTPServer;
    private io: SocketServerIO;

    constructor(app: express.Application) {
        this.app = app
        this.httpServer = createServer(this.app);
        this.io = new SocketServerIO(this.httpServer, {
            cors: {
                origin: process.env.CLIENT_URL,
                methods: ["GET", "POST"]
            }
        });
        this.configureSocket()
    }

    configureSocket() {
        this.io.use((socket, next) => {
            try {
                const token = socket.handshake.auth.token;
                socket.data.user = AuthMiddleware.decodeToken(token);
                next()
            } catch (e) {
                console.error("Error Socket verify user token", e)
                return next(new Error("Error Socket verify user token"));
            }
        })
        return this.io
    }

    getHttpServer(): HTTPServer {
        return this.httpServer
    }

    joinRoom() {
        this.io.on("connection", (socket) => {
            console.log("User connected with socket", socket.id);

            // Let the client join a room
            socket.on("join room", (roomId) => {
                socket.join(roomId);
                console.log("joiined room???? => yes id :", roomId)
                socket.emit('joined room', roomId); // notify client
                console.log(`${socket.id} joined room ${roomId}`);
            });

            socket.on("send message", ({roomId, content}, callback) => {
                console.log(`Message sent to room ${roomId}:`, content);
                // // this excludes sender :
                // socket.to(roomId).emit(...)  // ❌ excludes sender

                // Broadcast message to everyone else in the room
                this.io.to(roomId).emit("receive message", {
                    content,
                    senderId: socket.id,
                    userId: socket.data.user.id
                });
                if (typeof callback === 'function') {
                    callback({status: 'ok', senderId: socket.id});
                }
            });
        });
    }

    sendMessage(roomId: string, message: string) {
        this.io.to(roomId).emit("room-message", {
            room: roomId,
            message: message,
        });
    }
}

export default SocketServer