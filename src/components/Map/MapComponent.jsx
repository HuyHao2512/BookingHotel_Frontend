import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ latitude, longitude }) => {
  const defaultLat = 10.762622;
  const defaultLng = 106.660172;

  const lat = latitude ?? defaultLat;
  const lng = longitude ?? defaultLng;
  const handleViewMap = () => {
    window.open(
      `https://www.google.com/maps?q=${latitude},${longitude}`,
      "_blank"
    );
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-300 shadow-lg ml-2 mt-2">
      {/* Bản đồ */}
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{
          height: "263px",
          width: "100%",
          filter: "blur(1px)",
          pointerEvents: "none",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>

      {/* Nút "Xem bản đồ" */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={handleViewMap}
          className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-200"
        >
          Xem trên bản đồ
        </button>
      </div>
    </div>
  );
};

export default MapComponent;
