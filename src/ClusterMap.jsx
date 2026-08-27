// src/components/ClusterMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Import CSS cơ bản của Leaflet
import 'leaflet/dist/leaflet.css';

// Import Component Cluster và CSS của nó
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import { hcmcLocations } from './mapData'; // Nhớ điều chỉnh lại đường dẫn tùy cấu trúc thư mục của bạn

// Fix lỗi icon mặc định của React-Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// =======================================================
// COMPONENT CHÍNH
// =======================================================
const ClusterMap = ({
  containerHeight = '100vh',
  containerWidth = '100%'
}) => {
  // Tọa độ trung tâm: UBND Thành phố Hồ Chí Minh
  const position = [10.7766, 106.7012];

  return (
    <div style={{ height: containerHeight, width: containerWidth }}>
      <MapContainer
        center={position}
        zoom={14} // Zoom nhỏ lại một chút để thấy rõ sự gộp cụm ban đầu
        style={{ height: '100%', width: '100%' }}
      >
        {/* Lớp bản đồ nền (đang dùng Google Maps) */}
        <TileLayer
          url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          attribution='&copy; Google Maps'
        />

        {/* 
          Bọc toàn bộ Marker vào trong MarkerClusterGroup.
          Thuộc tính chunkedLoading giúp bản đồ không bị đơ nếu có quá nhiều marker (hàng ngàn cái).
        */}
        <MarkerClusterGroup chunkedLoading>
          {hcmcLocations.map((location) => (
            <Marker key={location.id} position={[location.lat, location.lng]}>
              <Popup>
                <div style={{ width: '200px' }}>
                  {/* Thẻ hiển thị hình ảnh */}
                  {location.imageUrl && (
                    <img
                      src={location.imageUrl}
                      alt={location.name}
                      style={{
                        width: '100%',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        marginBottom: '8px'
                      }}
                    />
                  )}
                  <h4 style={{ margin: '0 0 5px 0', color: '#0056b3', fontSize: '15px' }}>
                    {location.name}
                  </h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#555' }}>
                    {location.address}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

      </MapContainer>
    </div>
  );
};

export default ClusterMap;