import express from 'express';
import {createServer} from "http";
import {Server} from "socket.io";
import AuthMiddleware from "../auth";

export function initSocket(app: express.Application) {
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"]
        }
    });

    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            socket.data.user = AuthMiddleware.decodeToken(token);
            next()
        } catch (e) {
            console.error("Error Socket verify user token", e)
            return next(new Error("Error Socket verify user token"));
        }
    })
    io.on("connection", (socket) => {
        console.log("user connected to socket io", socket.id, socket.data.user);
        // ...
    });

    return httpServer
}