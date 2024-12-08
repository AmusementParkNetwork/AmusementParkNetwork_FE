import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./ChatPage.css";

function ChatPage() {
  const location = useLocation();
  const { name, workArea } = location.state || {
    name: "익명",
    workArea: "미지정 구역",
  };

  const [messages, setMessages] = useState([
    {
      sender: "관리자",
      text: "집에 가고 싶어요",
      area: "편의시설 구역",
      time: "오후 12:05",
    },
    { sender: name, text: "수고해라", area: workArea, time: "오후 12:05" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [congestion, setCongestion] = useState(0);
  const [waiting, setWaiting] = useState(0);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages([
        ...messages,
        { sender: name, text: newMessage, area: workArea, time: currentTime },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h2>놀이시설 및 편의시설 구역 채팅</h2>
      </header>
      <div className="chat-main-container">
        {/* 사이드바 */}
        <aside className="chat-sidebar">
          <img src={require("./logo.png")} alt="Logo" className="chat-icon" />
          <button
            className="sidebar-button"
            onClick={() => setWaiting(waiting + 1)}
          >
            대기인원 +1
          </button>
          <button
            className="sidebar-button"
            onClick={() => setCongestion(congestion + 1)}
          >
            혼잡도 +1
          </button>
          <p>대기인원: {waiting}</p>
          <p>혼잡도: {congestion}</p>
        </aside>

        {/* 채팅 영역 */}
        <main className="chat-main">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.sender === name ? "chat-you" : "chat-other"
                }`}
              >
                {msg.sender === name && (
                  <span className="message-time-left">{msg.time}</span>
                )}
                <div className="message-content">
                  <span className="message-meta">
                    <strong>{msg.area}</strong> / <strong>{msg.sender}</strong>
                  </span>
                  <div className="message-text">{msg.text}</div>
                </div>
                {msg.sender !== name && (
                  <span className="message-time-right">{msg.time}</span>
                )}
              </div>
            ))}
          </div>
          <footer className="chat-footer">
            <textarea
              className="chat-input"
              placeholder="메시지를 입력하세요"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="chat-send" onClick={handleSendMessage}>
              전송
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default ChatPage;
