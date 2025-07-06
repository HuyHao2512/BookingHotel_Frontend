import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useGetPropertyById from "../../hooks/useGetPropertyById";
import PropertyImages from "../../components/Property/PropertyImages";
import ImageModal from "../../components/Modal/ImageModal";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";

function Information() {
  const { id } = useParams();
  const { data: hotel, isLoading, isError } = useGetPropertyById(id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleShowAllImages = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);
  if (isLoading) return <div>Đang tải...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-[#082a5e]">{hotel.name}</h1>
        <Button icon={<EditOutlined />} type="primary" variant="outline">
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
          <strong>Thành phố:</strong> {hotel.city.name}, {hotel.city.country}
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
        <iframe
          title="hotel-map"
          src={`https://maps.google.com/maps?q=${hotel.lat},${hotel.long}&z=15&output=embed`}
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
          className="rounded-lg shadow"
        ></iframe>
      </div>
      <ImageModal
        isVisible={isModalVisible}
        handleClose={handleCloseModal}
        images={(hotel?.images || []).map((img) => img.url)}
      />
    </div>
  );
}

export default Information;
