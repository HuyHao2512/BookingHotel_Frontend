import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ googleMapUrl }) => {
  const handleViewMap = () => {
    window.open(`${googleMapUrl}`, "_blank");
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-300 shadow-lg ml-2 mt-2">
      {/* Bản đồ */}
      <MapContainer
        center={[10.03017, 105.077058]}
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
