import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-300 shadow-lg ml-2 mt-2">
      <MapContainer
        center={[10.762622, 106.660172]}
        zoom={13}
        style={{ height: "263px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[10.762622, 106.660172]}>
          <Popup>Đây là Hồ Chí Minh!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
