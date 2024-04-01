import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
    path: "/socket/",
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
  
io.on("connection", (socket) => {
    console.log("connected");

    socket.on("start", () => {
        console.log("start");
    });
});
  
httpServer.listen(8080, () => {
    console.log("Chat server listening on port 8080");
});
