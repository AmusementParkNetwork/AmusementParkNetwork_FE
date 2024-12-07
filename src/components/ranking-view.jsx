import { useState } from "react";

import { rankingData as initialData } from "../lib/const";

import "../styles/admin-ranking.css";

const tabMap = {
  amusement: {
    title: "놀이기구",
  },
  amenity: {
    title: "편의시설",
  },
  photo: {
    title: "포토존",
  },
};

const RankingView = () => {
  //amusement | amenity | photo
  const [tab, setTab] = useState("amusement");
  const [rankingData, setRankingData] = useState(initialData);
  const rankings = rankingData[tab];

  return (
    <div className="section">
      <h2 className="section-title">실시간 대기시간 | 혼잡도 순위</h2>
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
            {rankings.map((ranking, index) => (
              <li key={index} className="raking-box">
                <span>{ranking.name}</span>
                <div className="gauge-container">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      className={`gauge-box ${
                        index < ranking.gauge ? "active" : ""
                      }`}
                    />
                  ))}
                </div>
                <span>대기시간 {ranking.waitTime}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RankingView;
