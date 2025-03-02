import React, { useRef, useState } from "react";
import { Modal, Tag, Typography } from "antd";
import RoomImages from "../Property/RoomImages";
const { Title, Text } = Typography;
const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    value
  );

const RoomModal = ({ selectedRoom, isVisible, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const carouselRef = useRef(null);

  return (
    <Modal
      title="Thông Tin Phòng"
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={900}
    >
      {selectedRoom && (
        <div className="flex flex-col gap-6">
          <div className="flex">
            <RoomImages
              images={selectedRoom.images}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              carouselRef={carouselRef}
            />
            <div className="w-1/2 ml-4">
              <Title level={3}>{selectedRoom.name}</Title>
              <Text className="block text-gray-500">
                <strong>Kích thước phòng:</strong> {selectedRoom.area} m²
              </Text>
              <Text className="block text-gray-500 mt-2">
                <strong>Hướng phòng:</strong> {selectedRoom.direction}
              </Text>
              <Text strong className="block text-red-500 text-lg mt-2">
                Giá từ: {formatCurrency(selectedRoom.price)} / đêm
              </Text>
              <p className="mt-3">
                <strong>Số người tối đa:</strong> {selectedRoom.capacity}
              </p>
              <p>
                <strong>Số giường:</strong> {selectedRoom.bed}
              </p>
              <Title level={5}>Tiện nghi:</Title>
              <div className="flex flex-wrap gap-2">
                {selectedRoom.conveniences?.map((convenience, index) => (
                  <Tag color="blue" key={index}>
                    {convenience?.name || convenience}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
export default RoomModal;
