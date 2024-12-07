import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
    const [name, setName] = useState(""); // 이름 저장
    const [workArea, setWorkArea] = useState(""); // 근무지 저장
    const navigate = useNavigate(); // Navigation hook

    const handleStart = () => {
        console.log("이름:", name);
        console.log("근무지:", workArea || "근무지를 설정하지 않았습니다.");

        // 채팅 페이지로 이동하며 state 전달
        navigate("/chat", { state: { name, workArea } });
    };

    return (
        <div className="container">
            <header className="header">
                <img
                    src={require("./logo.png")}
                    alt="Amusement Park Logo"
                    className="logo"
                />
                <p className="description">
                    놀이공원 관리를 시작하기 위해서는 <br /> 이름과 근무지를 설정해주세요
                </p>
            </header>
            <div className="form">
                <input
                    type="text"
                    placeholder="이름 입력"
                    className="input-field"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <select
                    className="input-field"
                    value={workArea}
                    onChange={(e) => setWorkArea(e.target.value)}
                >
                    <option value="" disabled>
                        근무지 설정
                    </option>
                    <option>운영기구 구역</option>
                    <option>놀이기구 구역</option>
                    <option>편의시설 구역</option>
                </select>
                <button className="start-button" onClick={handleStart}>
                    시작
                </button>
            </div>
        </div>
    );
}

export default App;
