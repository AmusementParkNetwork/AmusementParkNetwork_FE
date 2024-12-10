import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { SocketContext } from "../SocketContext";

import logo from "../logo.png";
import "../styles/chat.css";

function ChatPage() {
  const location = useLocation();
  const { name, workArea } = location.state || {
    name: "익명",
    workArea: "미지정 구역",
  };

  const { socket } = useContext(SocketContext);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [congestion, setCongestion] = useState({
    degree: 0,
    percentage: 0,
  });
  const [waiting, setWaiting] = useState({
    number: 0,
    time: 0,
  });

  useEffect(() => {
    socket.on("userJoined", ({ username, users }) => {
      const systemMessage = {
        sender: "System",
        text: `${username}님이 입장하셨습니다.`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        area: "시스템",
      };
      setMessages((prev) => [...prev, systemMessage]);
    });

    socket.on("userLeft", ({ username, users }) => {
      const systemMessage = {
        sender: "System",
        text: `${username}님이 퇴장하셨습니다.`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        area: "시스템",
      };
      setMessages((prev) => [...prev, systemMessage]);
    });

    socket.on("chat", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("crowdedNum", (data) => {
      setCongestion(data);
    });

    socket.on("waitingNum", (data) => {
      setWaiting(data);
    });

    return () => {
      socket.emit("leave", name, workArea);

      socket.off("userJoined");
      socket.off("chat");
      socket.off("userLeft");
      socket.off("crowdedNum");
      socket.off("waitingNum");
    };
  }, [name, workArea]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "/대기시간") {
      const systemMessage = {
        sender: "System",
        text: `현재 대기시간은 ${waiting.time}분 입니다.`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        area: "시스템",
      };
      setMessages((prev) => [...prev, systemMessage]);
      setNewMessage("");
      return;
    } else if (newMessage.trim() === "/대기시간") {
      const systemMessage = {
        sender: "System",
        text: `현재 혼잡도는 ${congestion.percentage}% 입니다.`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        area: "시스템",
      };
      setMessages((prev) => [...prev, systemMessage]);
      setNewMessage("");
      return;
    }
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const messageData = {
        sender: name,
        text: newMessage,
        time: currentTime,
        area:
          workArea === 1
            ? "관제실 운영팀"
            : workArea === 2
            ? "놀이기구 관리구역"
            : "편의시설 관리구역",
      };
      socket.emit("chat", messageData, workArea);
      setNewMessage("");
    }
  };

  const handleCongestion = () => {
    socket.emit("crowded", workArea);
  };

  const handleWaiting = () => {
    socket.emit("waiting", workArea);
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h2>
          {workArea === 1
            ? "관제실 운영팀"
            : workArea === 2
            ? "놀이기구 관리구역"
            : "편의시설 관리구역"}{" "}
          단체 채팅방
        </h2>
      </header>
      <div className="chat-main-container">
        {/* 사이드바 */}
        <aside className="chat-sidebar">
          <img src={logo} alt="Logo" className="chat-icon" />
          <button className="sidebar-button" onClick={handleWaiting}>
            대기인원 +1
          </button>
          <p>대기인원 (명): {waiting.number || 0}</p>
          <button className="sidebar-button" onClick={handleCongestion}>
            혼잡도 +1
          </button>
          <p>혼잡도 (명): {congestion.degree || 0}</p>
        </aside>

        {/* 채팅 영역 */}
        <main className="chat-main">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.sender === name
                    ? "chat-you"
                    : msg.area === "관제실 운영팀"
                    ? "chat-control-room"
                    : "chat-other"
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
