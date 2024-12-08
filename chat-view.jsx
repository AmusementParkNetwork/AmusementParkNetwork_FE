import { useEffect, useRef, useState, useContext } from "react";
import { SocketContext } from "../SocketContext";

import "../styles/admin-chat.css";

const ChatView = () => {
  const ulRef = useRef(null);

  const { socket } = useContext(SocketContext);

  const [chats, setChats] = useState([]); // 채팅 메시지 상태
  const [message, setMessage] = useState(""); // 입력 메시지 상태

  useEffect(() => {
    // 채팅 리스트 하단 고정
    if (ulRef.current) {
      ulRef.current.scrollTop = ulRef.current.scrollHeight;
    }
  }, [chats]);

  useEffect(() => {
    socket.on("chat", (message) => {
      setChats((prev) => [...prev, message]);
    });

    return () => {
      socket.off("chat");
    };
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      const chatMessage = {
        sender: "운영팀 관리자",
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        area: "관제실 운영팀",
      };
      socket.emit("chat", chatMessage, 1);
      setMessage("");
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
                chat.area === "관제실 운영팀" ? (
                  <li key={index} className="chat-block admin">
                    <div className="chat-box">
                      <div className="chat-box-text">
                        <span className="chat-sender">{chat.sender}</span>
                        <p>{chat.text}</p>
                      </div>
                      <img src="/profile.png" alt="" className="chat-image" />
                    </div>
                    <span className="chat-timestamp">{chat.timestamp}</span>
                  </li>
                ) : (
                  <li key={index} className="chat-block">
                    <div className="chat-box">
                      <img src="/profile.png" alt="" className="chat-image" />
                      <div className="chat-box-text">
                        <span className="chat-sender">{chat.sender}</span>
                        <p>{chat.text}</p>
                      </div>
                    </div>
                    <span className="chat-timestamp">{chat.timestamp}</span>
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
