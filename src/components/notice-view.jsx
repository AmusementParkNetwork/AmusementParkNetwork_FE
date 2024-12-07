import { useState } from "react";

import { noticeData } from "../lib/const";

import "../styles/admin-notice.css";

const NoticeView = () => {
  const [notices, setNotices] = useState(noticeData);

  return (
    <div className="section">
      <h2 className="section-title">공지사항</h2>
      <div className="section-content">
        <ul className="notice-list">
          {notices.map((notice, index) => (
            <li key={index} className="notice-box">
              <div className="notice-text">
                <h2>{notice.title}</h2>
                <p>{notice.description}</p>
              </div>
              <span className="notice-date">{notice.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NoticeView;
