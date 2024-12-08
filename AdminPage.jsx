import ChatView from "../components/chat-view";
import MapView from "../components/map-view";
import NoticeView from "../components/notice-view";
import RankingView from "../components/ranking-view";

import "../styles/admin.css";

const AdminPage = () => {
  return (
    <div className="container">
      <ChatView />
      <MapView />
      <NoticeView />
      <RankingView />
    </div>
  );
};

export default AdminPage;
