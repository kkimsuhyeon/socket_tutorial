"use strict";

const socket = io();

const nickName = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

sendButton.addEventListener("click", function () {
  const params = {
    name: nickName.value,
    msg: chatInput.value,
  };

  socket.emit("chatting", params); // emit은 데이터를 전송 // 채널, 메세지
});

socket.on("chatting", (data) => {
  // on은 데이터를 받음 // data에는 서버에서 보낸 데이터가 들어가있음
  const item = new LiModel(data.name, data.msg, data.time);

  item.makeLi();

  displayContainer.scrollTo(0, displayContainer.scrollHeight);
});

function LiModel(name, msg, time) {
  this.name = name;
  this.msg = msg;
  this.time = time;

  this.makeLi = () => {
    const li = document.createElement("li");
    li.classList.add(nickname.value === this.name ? "sent" : "received");
    const dom = `
    <span class="profile">
        <span class="user">${this.name}</span>
        <img
        class="image"
        src="https://placeimg.com/50/50/any"
        alt="any"
        />
    </span>
    <span class="message">${this.msg}</span>
    <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li);
  };
}
