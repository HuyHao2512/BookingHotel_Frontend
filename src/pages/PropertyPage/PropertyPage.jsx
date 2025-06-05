import React, { useState, useEffect } from "react";
import { Anchor, Button, Col, Row, Tag } from "antd";
import PropertyDetails from "../../components/Property/PropertyDetails";
import PropertyImages from "../../components/Property/PropertyImages";
import PropertyAmenities from "../../components/Property/PropertyAmenities";
import AvailableRooms from "../../components/Property/AvailableRooms";
import ImageModal from "../../components/Modal/ImageModal";
import Review from "../../components/Property/Review";
import MapComponent from "../../components/Map/MapComponent";
import { useParams } from "react-router-dom";
import useGetPropertyById from "../../hooks/useGetPropertyById";
import useRoomByProperty from "../../hooks/useRoomByProperty";
import { useBooking } from "../../contexts/BookingContext";
const PropertyPage = () => {
  const { id } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const { updateBooking } = useBooking();
  const { data: propertiesData, isLoading, isError } = useGetPropertyById(id);
  const {
    data: rooms = [],
    isLoading: isRoomsLoading,
    isError: isRoomsError,
  } = useRoomByProperty(id);
  const [propertyName, setPropertyName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  useEffect(() => {
    if (propertiesData) {
      setPropertyName(propertiesData.name);
      setPropertyAddress(propertiesData.address);
    }
  }, [propertiesData]);

  useEffect(() => {
    updateBooking({
      property: id,
      propertyName: propertyName,
      propertyAddress: propertyAddress,
    });
  }, [propertyName, propertyAddress]);

  useEffect(() => {
    if (rooms) {
      setDataSource(rooms);
    }
  }, [rooms]);
  if (isLoading || isRoomsLoading) return <h1>Đang tải...</h1>;
  if (isError || isRoomsError) return <h1>Đã xảy ra lỗi</h1>;
  const property = propertiesData;

  const handleShowAllImages = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);
  return (
    <div className="w-full px-6 mt-6 py-8">
      <div className="max-w-screen-xl mx-auto relative">
        {/* Thanh điều hướng */}{" "}
        <div className="border-b pb-2 flex justify-around w-full">
          <Anchor
            direction="horizontal"
            items={[
              { key: "part-1", href: "#part-1", title: "Tổng quan" },
              {
                key: "part-2",
                href: "#part-2",
                title: "Thông tin & tiện ích",
              },
              { key: "part-3", href: "#part-3", title: "Thông tin phòng" },
              { key: "part-4", href: "#part-4", title: "Đánh giá" },
            ]}
            className="w-full flex justify-around"
          />
        </div>
        {/* Nội dung */}
        <div id="part-1" className="w-full h-full">
          <PropertyDetails property={property} />
          <Row className="w-full h-full mt-4">
            <Col span={18}>
              <PropertyImages
                images={property.images}
                handleShowAllImages={handleShowAllImages}
              />
            </Col>
            <Col span={6}>
              <div className="bg-white border border-gray-300 rounded-xl shadow-lg p-4 ml-2">
                <h2 className="text-xl font-bold">Điểm nổi bật</h2>
                <Tag
                  color="purple"
                  style={{
                    fontSize: "1rem",
                    padding: "6px 8px",
                    marginBottom: "8px",
                  }}
                >
                  Không cần thanh toán trước
                </Tag>
                <Tag
                  color="purple"
                  style={{
                    fontSize: "1rem",
                    padding: "6px 8px",
                    marginBottom: "8px",
                  }}
                >
                  Hủy phòng miễn phí
                </Tag>
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                  onClick={() =>
                    document
                      .getElementById("part-2")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Đặt ngay
                </button>

                {/* Nút lưu */}
                <button className="w-full mt-2 border border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-100 transition">
                  Lưu chỗ nghỉ
                </button>
              </div>
              <></>
              <MapComponent longitude={property.long} latitude={property.lat} />
            </Col>
          </Row>
        </div>
        <div id="part-2" className="w-full h-full mt-4">
          <Row>
            <Col span={18}>
              <p className="whitespace-pre-line mt-8 mb-8 font-beVietnam leading-relaxed text-gray-600">
                {property.description}
              </p>
            </Col>
            <Col span={6}>
              <h1 className="text-2xl font-bold mb-4">Tiện nghi</h1>
              <PropertyAmenities amenities={property.amenities} />
            </Col>
          </Row>
        </div>
        <div id="part-3" className="w-full h-full mt-4">
          <AvailableRooms dataSource={rooms} />
        </div>
        <div id="part-4" className="w-full h-full mt-16">
          <h1 className="text-2xl font-bold mb-4">Đánh giá của khách</h1>
          <Review />
        </div>
      </div>
      <ImageModal
        isVisible={isModalVisible}
        handleClose={handleCloseModal}
        images={(property.images || []).map((img) => img.url)}
      />
    </div>
  );
};

export default PropertyPage;
