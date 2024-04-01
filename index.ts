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
    let state: boolean = false;
    let data = "";

    // ゲームの開始準備
    socket.on("start", (data) => {
        try {
            console.log("start");
            console.log(data);
            sendData(socket.id, "start", true, data);
        } catch (error) {
            // エラーだった場合はエラー文をクライアントに返す
            console.log(error);
            if (error instanceof Error) {
                sendData(socket.id, "start", false, error.message);
            }
        }
    });
});

// クライアントにデータを送信する
function sendData(socketID: string, command: string, state: boolean, data: string | Object) {
    io.to(socketID).emit(command, {state, data});
}
  
httpServer.listen(8080, () => {
    console.log("Chat server listening on port 8080");
});
