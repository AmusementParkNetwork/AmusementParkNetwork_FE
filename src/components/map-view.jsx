import "../styles/admin-map.css";

const MapView = () => {
  return (
    <div className="section">
      <h2 className="section-title">실시간 대기시간 | 혼잡도</h2>
      <div className="section-content">
        <div className="map-container">
          <img src="/park-map.png" alt="" className="map-image" />
        </div>
      </div>
    </div>
  );
};

export default MapView;
