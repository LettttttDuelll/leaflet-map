// eslint-disable-next-line no-unused-vars
import React from 'react';
//import ClusterMap from './components/ClusterMap';
import ClusterMap from './ClusterMap';
function App() {
  return (
    <div>
      {/* Component tự động lấy full màn hình nhờ default props (100vh) */}
      <ClusterMap />
      
      {/* Hoặc tuỳ chỉnh kích thước qua props */}
      {/* <ClusterMap containerHeight="500px" containerWidth="80%" /> */}
    </div>
  );
}

export default App;