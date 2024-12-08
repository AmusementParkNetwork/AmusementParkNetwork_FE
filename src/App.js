import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "./SocketContext";

import "./App.css";

const nav = [
  {
    area: "관제실 운영팀",
    value: 1,
    path: "/admin",
  },
  {
    area: "놀이기구 관리구역",
    value: 2,
    path: "/chat",
  },
  {
    area: "편의시설 관리구역",
    value: 3,
    path: "/chat",
  },
];

function App() {
  const [name, setName] = useState(""); // 이름 저장
  const [workArea, setWorkArea] = useState(""); // 근무지 저장
  const navigate = useNavigate(); // Navigation hook
  const { socket } = useContext(SocketContext);

  const handleStart = () => {
    if (!name || !workArea) return;

    socket.emit("join", name, workArea);

    // 근무지에 따라 다른 페이지로 이동
    if (workArea === 1) {
      navigate("/admin", { state: { name, workArea } }); // admin.jsx로 이동
    } else {
      navigate("/chat", { state: { name, workArea } }); // chat.jsx로 이동
    }
  };

  useEffect(() => {
    console.log("이름:", name);
    console.log("근무지:", workArea);
  }, [name, workArea]);

  return (
    <div className="outer-container">
      <div className="inner-container">
        <header className="header">
          <img
            src={require("./logo.png")}
            alt="Amusement Park Logo"
            className="logo"
          />
          <p className="description">
            놀이공원 관리를 시작하기 위해서는 <br /> 이름과 근무지를
            설정해주세요
          </p>
        </header>
        <div className="form-box">
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
            onChange={(e) => setWorkArea(Number(e.target.value))}
          >
            <option value="" disabled>
              근무지 설정
            </option>
            {nav.map((n, index) => (
              <option key={index} value={n.value}>
                {n.area}
              </option>
            ))}
          </select>
          <button className="start-button" onClick={handleStart}>
            시작
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
