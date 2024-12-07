import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./ChatPage.css";

function ChatPage() {
    const location = useLocation();
    const { name, workArea } = location.state || { name: "익명", workArea: "미지정 구역" }; // 기본값 설정

    const [messages, setMessages] = useState([
        { sender: "펀", text: "집에 가고 싶어요", area: "편의시설 구역" },
        { sender: name, text: "수고해라", area: workArea },
    ]);
    const [newMessage, setNewMessage] = useState(""); // 새로운 메시지
    const [congestion, setCongestion] = useState(0); // 혼잡도 상태
    const [waiting, setWaiting] = useState(0); // 대기인원 상태

    // 메시지 전송 핸들러
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages([
                ...messages,
                { sender: name, text: newMessage, area: workArea },
            ]);
            setNewMessage("");
        }
    };

    return (
        <div className="chat-container">
            <header className="chat-header">
                <h1>채팅 페이지</h1>
            </header>
            <div className="chat-content">
                {/* 사이드바 */}
                <aside className="chat-sidebar">
                    <img src={require("./logo.png")} alt="Logo" className="chat-icon" />
                    <button className="sidebar-button" onClick={() => setWaiting(waiting + 1)}>
                        대기인원 +1
                    </button>
                    <button className="sidebar-button" onClick={() => setCongestion(congestion + 1)}>
                        혼잡도 +1
                    </button>
                    <p>대기인원: {waiting}</p>
                    <p>혼잡도: {congestion}</p>
                </aside>

                {/* 채팅 메시지 영역 */}
                <main className="chat-main">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`chat-message ${msg.sender === name ? "chat-you" : "chat-other"
                                }`}
                        >
                            {/* 이름과 구역 */}
                            <div className="message-meta-box">
                                <span className="message-meta">
                                    {msg.area} / {msg.sender}
                                </span>
                            </div>
                            {/* 메시지 본문 */}
                            <div className="message-text-box">
                                <div className="message-text">
                                    {msg.text.split("\n").map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </main>
            </div>

            {/* 메시지 입력 */}
            <footer className="chat-footer">
                <textarea
                    placeholder="메시지를 입력하세요"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="chat-input"
                    rows="2"
                />
                <button onClick={handleSendMessage} className="chat-send">
                    전송
                </button>
            </footer>
        </div>
    );
}

export default ChatPage;
