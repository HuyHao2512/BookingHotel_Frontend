import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useGetPropertyById from "../../hooks/useGetPropertyById";
import PropertyImages from "../../components/Property/PropertyImages";
import ImageModal from "../../components/Modal/ImageModal";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import UpdatePropertyModal from "../../components/Modal/UpdatePropertyModal";
import { MapContainer, TileLayer } from "react-leaflet";

function Information() {
  const { id } = useParams();
  const { data: hotel, isLoading, isError } = useGetPropertyById(id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const handleShowAllImages = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);
  if (isLoading) return <div>Đang tải...</div>;
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-[#082a5e]">{hotel.name}</h1>
        <Button
          icon={<EditOutlined />}
          type="primary"
          variant="outline"
          onClick={() => setIsUpdateModalVisible(true)}
        >
          Chỉnh sửa
        </Button>
      </div>

      <div className="mb-6">
        <PropertyImages
          images={hotel.images}
          handleShowAllImages={handleShowAllImages}
        />
      </div>

      {/* Thông tin chung */}
      <div className="mb-6">
        <p className="text-gray-600">
          <strong>Địa chỉ:</strong> {hotel.address}
        </p>
        <p className="text-gray-600">
          <strong>Email:</strong> {hotel.email}
        </p>
        <p className="text-gray-600">
          <strong>Điện thoại:</strong> {hotel.phone}
        </p>
        <p className="text-gray-600">
          <strong>Loại:</strong> {hotel.category.name}
        </p>
        <p className="text-yellow-500">
          <strong>Đánh giá:</strong> ⭐ {hotel.rate}
        </p>
      </div>

      {/* Mô tả */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#082a5e] mb-2">
          Giới thiệu
        </h2>
        <p className="text-gray-700 whitespace-pre-line">{hotel.description}</p>
      </div>

      {/* Tiện nghi */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#082a5e] mb-2">
          Tiện nghi nổi bật
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 list-disc list-inside text-gray-700">
          {hotel.amenities.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>

      {/* Bản đồ */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#082a5e] mb-2">
          Vị trí trên bản đồ
        </h2>
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
              onClick={() => window.open(hotel.googleMapUrl, "_blank")}
              className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-200"
            >
              Xem trên bản đồ
            </button>
          </div>
        </div>
      </div>
      <ImageModal
        isVisible={isModalVisible}
        handleClose={handleCloseModal}
        images={(hotel?.images || []).map((img) => img.url)}
      />
      <UpdatePropertyModal
        property={hotel}
        onClose={() => setIsUpdateModalVisible(false)}
        isVisible={isUpdateModalVisible}
      />
    </div>
  );
}

export default Information;
