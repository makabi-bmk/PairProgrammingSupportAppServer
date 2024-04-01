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

    // ゲームの開始準備
    socket.on("start", (data) => {
        console.log("start");
        console.log(data);
    });
});
  
httpServer.listen(8080, () => {
    console.log("Chat server listening on port 8080");
});
