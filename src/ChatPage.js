import React, { useState } from "react";
import "./ChatPage.css";

function ChatPage() {
    const [messages, setMessages] = useState([
        { sender: "펀", text: "편의점 사람 너무 많아 집에 가고 싶어요" },
        { sender: "You", text: "화장실도 사람 개많음 수고해라" },
        { sender: "펀", text: "그만 들어오라고 해요 너무 많아" },
    ]); // 초기 메시지
    const [newMessage, setNewMessage] = useState(""); // 새로운 메시지
    const [congestion, setCongestion] = useState(0); // 혼잡도 상태
    const [waiting, setWaiting] = useState(0); // 대기인원 상태

    // 메시지 전송 핸들러
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, { sender: "You", text: newMessage }]);
            setNewMessage("");
        }
    };

    // 혼잡도 및 대기인원 증가 핸들러
    const increaseCongestion = () => setCongestion(congestion + 1);
    const increaseWaiting = () => setWaiting(waiting + 1);

    return (
        <div className="chat-container">
            <header className="chat-header">
                <h1>채팅 페이지</h1>
            </header>
            <div className="chat-content">
                {/* 사이드바 */}
                <aside className="chat-sidebar">
                    <img src={require("./logo.png")} alt="Logo" className="chat-icon" />
                    <button className="sidebar-button" onClick={increaseWaiting}>
                        대기인원 +1
                    </button>
                    <button className="sidebar-button" onClick={increaseCongestion}>
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
                            className={`chat-message ${msg.sender === "You" ? "chat-you" : "chat-other"
                                }`}
                        >
                            <strong>{msg.sender}:</strong> {msg.text}
                        </div>
                    ))}
                </main>
            </div>

            {/* 메시지 입력 */}
            <footer className="chat-footer">
                <input
                    type="text"
                    placeholder="메시지를 입력하세요"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="chat-input"
                />
                <button onClick={handleSendMessage} className="chat-send">
                    전송
                </button>
            </footer>
        </div>
    );
}

export default ChatPage;
