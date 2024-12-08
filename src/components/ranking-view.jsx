import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../SocketContext";

import { rankingData as initialData } from "../lib/const";

import "../styles/admin-ranking.css";

const tabMap = {
  amusement: {
    title: "놀이기구",
  },
  amenity: {
    title: "편의시설",
  },
  // photo: {
  //   title: "포토존",
  // },
};

const RankingView = () => {
  const { socket } = useContext(SocketContext);

  //amusement | amenity | photo
  const [tab, setTab] = useState("amusement");
  const [rankingData, setRankingData] = useState(initialData);
  const rankings = rankingData[tab];

  const [congestion, setCongestion] = useState({
    degree: 0,
    percentage: 0,
  });
  const [waiting, setWaiting] = useState({
    number: 0,
    time: 0,
  });

  useEffect(() => {
    socket.on("crowdedNum", (data) => {
      console.log("혼잡도: ", data);
      setCongestion(data);
    });

    socket.on("waitingNum", (data) => {
      console.log("대기시간: ", data);
      setWaiting(data);
    });

    return () => {
      socket.off("crowdedNum");
      socket.off("waitingNum");
    };
  }, []);

  return (
    <div className="section">
      <h2 className="section-title">실시간 대기시간(분) | 혼잡도(%)</h2>
      <div className="section-content">
        <div className="ranking-container">
          <div className="ranking-tabs">
            {Object.keys(tabMap).map((key) => (
              <button
                onClick={() => setTab(key)}
                className={`ranking-tab-button ${tab === key ? "active" : ""}`}
              >
                {tabMap[key].title}
              </button>
            ))}
          </div>
          <ul className="ranking-list">
            <li className="raking-box">
              <span>T익스프레스</span>
              <div className="gauge-container">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    className={`gauge-box ${
                      index < waiting.time / 30 ? "active" : ""
                    }`}
                  />
                ))}
              </div>
              <span>대기시간 {waiting.time}분</span>
              <div className="gauge-container">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    className={`gauge-box ${
                      index < congestion.degree / 2 ? "active" : ""
                    }`}
                  />
                ))}
              </div>
              <span>혼잡도 {congestion.percentage}%</span>
            </li>
            {rankings.map((ranking, index) => {
              return (
                <li key={index} className="raking-box">
                  <span>{ranking.name}</span>
                  <div className="gauge-container">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        className={`gauge-box ${
                          index < ranking.waiting.guage ? "active" : ""
                        }`}
                      />
                    ))}
                  </div>
                  <span>대기시간 {ranking.waiting.waitTime}분</span>
                  <div className="gauge-container">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div
                        className={`gauge-box ${
                          index < ranking.crowded.guage ? "active" : ""
                        }`}
                      />
                    ))}
                  </div>
                  <span>혼잡도 {ranking.crowded.percentage}%</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RankingView;
