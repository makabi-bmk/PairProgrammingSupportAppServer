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

// クライアントとの通信に使うコマンド一覧
enum Command {
    Start       = "start",
    GetQuiz     = "get_quiz",
    JudgeAns    = "judge_ans", 
}

io.on("connection", (socket) => {
    console.log("connected");

    // ゲームの開始準備
    socket.on(Command.Start, (data) => {
        try {
            sendData(socket.id, Command.Start, true, data);
        } catch (error) {
            // エラーだった場合はエラー文をクライアントに返す
            console.log(error);
            if (error instanceof Error) {
                sendData(socket.id, Command.Start, false, error.message);
            }
        }
    });

    // 問題の正誤判定
    socket.on(Command.JudgeAns, (data) => {
        try {
            // TODO: ここに正誤判定のアルゴリズムを入れる
            let judge = true;
            let nextQuestionNum = 2;

            // 正解の場合と不正解の場合の処理
            if (judge) {
                sendData(socket.id, Command.JudgeAns, true, {"judge": judge, "next_question_num": nextQuestionNum});
            } else {
                sendData(socket.id, Command.JudgeAns, true, {"judge": judge});
            }

        } catch (error) {
            // エラーだった場合はエラー文をクライアントに返す
            console.log(error);
            if (error instanceof Error) {
                sendData(socket.id, Command.JudgeAns, false, error.message);
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
