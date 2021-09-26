const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const moment = require("moment");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "src")));

io.on("connection", (socket) => {
  // 연결이 이루어 졌을때 socket에 데이터가 담겨짐 연결됨

  socket.on("chatting", (data) => {
    // data는 클라이언트가 전달한 데이터가 들어가있음
    const { name, msg } = data;

    io.emit("chatting", { name, msg, time: moment(new Date()).format("h:mm A") }); // 서버에서 클라이언트로 다시 메세지를 전달함
  });
});

server.listen(PORT, () => console.log("run"));
