import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import { chatData } from "../lib/const";

import "../styles/admin-chat.css";

const socket = io("http://localhost:3000"); // 서버 주소

const ChatView = () => {
  const [chats, setChats] = useState([]); // 기존 채팅 리스트 상태
  const [message, setMessage] = useState(""); // 입력 메시지 상태
  const ulRef = useRef(null);

  useEffect(() => {
    // 채팅 리스트 하단 고정
    if (ulRef.current) {
      ulRef.current.scrollTop = ulRef.current.scrollHeight;
    }
  }, [chats]);

  useEffect(() => {
    // 서버에서 메시지 수신
    socket.on("chat message", (msg) => {
      setChats((prevChats) => [...prevChats, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      const chatMessage = { sender: "관제실 알림", text: message, isAdmin: true };
      socket.emit("chat message", chatMessage); // 서버로 메시지 전송
      setChats((prevChats) => [...prevChats, chatMessage]); // UI 업데이트
      setMessage(""); // 입력 필드 초기화
    }
  };

  return (
    <div className="section">
      <h2 className="section-title">관리자 채팅</h2>
      <div className="section-content">
        <div className="chat-container">
          <div className="chat-content">
            <ul ref={ulRef} className="chat-list">
              {chats.map((chat, index) =>
                chat.isAdmin ? (
                  <li key={index} className="chat-block admin">
                    <div className="chat-box">
                      <div className="chat-box-text">
                        <span>{chat.sender}</span>
                        <p>{chat.text}</p>
                      </div>
                      <img src="/profile.png" alt="" className="chat-image" />
                    </div>
                  </li>
                ) : (
                  <li key={index} className="chat-block">
                    <div className="chat-box">
                      <img src="/profile.png" alt="" className="chat-image" />
                      <div className="chat-box-text">
                        <span>{chat.sender}</span>
                        <p>{chat.text}</p>
                      </div>
                    </div>
                  </li>
                )
              )}
            </ul>
            <div className="chat-input-box">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)} // 입력 값 업데이트
                onKeyDown={(e) => e.key === "Enter" && handleSend()} // Enter로 전송
              />
              <button onClick={handleSend}>전송</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
