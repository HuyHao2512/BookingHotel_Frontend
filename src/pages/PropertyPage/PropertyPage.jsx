import React, { useState } from "react";
import { Anchor, Button, Col, Row, Tag } from "antd";
import PropertyDetails from "../../components/Property/PropertyDetails";
import PropertyImages from "../../components/Property/PropertyImages";
import PropertyAmenities from "../../components/Property/PropertyAmenities";
import AvailableRooms from "../../components/Property/AvailableRooms";
import ImageModal from "../../components/Modal/ImageModal";
import Review from "../../components/Property/Review";
import MapComponent from "../../components/Map/MapComponent";
const rooms = [
  {
    _id: "67b6f1fe51cc7120b0c842e9",
    name: "Phòng Deluxe Giường Đôi ",
    property: {
      _id: "67b6e680f62f90f265b9bbf2",
      name: "test 111112",
      owner: "6791d10789471702c8a6f259",
      category: "6791c0c62237534d54e58bf1",
      city: "67b0a936af1c12cac8479734",
      amenities: ["67b6dcfa4b0bbffca3f45496", "67b0a553af1c12cac8479723"],
      address: "26 Phat Loc, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
      email: "owner@gmail.com",
      phone: "0123456789",
      description:
        "{`Pilgrimage Village Boutique Resort & Spa là resort mộc mạc...\\n\\nTại đây, du khách có thể lựa chọn trong số các bungalow...`}\n",
      rate: 5,
      images: [],
      createdAt: "2025-02-20T08:23:28.837Z",
      updatedAt: "2025-02-20T08:23:28.837Z",
      __v: 0,
    },
    typeroom: "67b0af0baf1c12cac847973c",
    conveniences: [
      {
        _id: "67b0b12caf1c12cac8479744",
        name: "Có bếp",
        __v: 0,
      },
      {
        _id: "67b0b124af1c12cac8479742",
        name: "Có vòi sen",
        __v: 0,
      },
    ],
    price: 11200000,
    area: 22,
    capacity: 2,
    bed: 1,
    direction: "Tây Nam",
    isAvailable: true,
    images: [
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1726242056/bxlnomhnlfdx80ejnjf8.jpg",
        publicId: "rooms/nkl3bgv8yycr3zetlwdx",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1726242056/bxlnomhnlfdx80ejnjf8.jpg",
        publicId: "rooms/cm3i1piip4lqkdnvikdo",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1726242056/bxlnomhnlfdx80ejnjf8.jpg",
        publicId: "rooms/nkl3bgv8yycr3zetlwdx",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1726242056/bxlnomhnlfdx80ejnjf8.jpg",
        publicId: "rooms/nkl3bgv8yycr3zetlwdx",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1726242056/bxlnomhnlfdx80ejnjf8.jpg",
        publicId: "rooms/nkl3bgv8yycr3zetlwdx",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1726242056/bxlnomhnlfdx80ejnjf8.jpg",
        publicId: "rooms/nkl3bgv8yycr3zetlwdx",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1726242056/bxlnomhnlfdx80ejnjf8.jpg",
        publicId: "rooms/nkl3bgv8yycr3zetlwdx",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1726242056/bxlnomhnlfdx80ejnjf8.jpg",
        publicId: "rooms/nkl3bgv8yycr3zetlwdx",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1726242056/bxlnomhnlfdx80ejnjf8.jpg",
        publicId: "rooms/nkl3bgv8yycr3zetlwdx",
      },
    ],
    quantity: 5,
    isLocked: false,
    totalRoom: 5,
    createdAt: "2025-02-20T09:12:30.528Z",
    updatedAt: "2025-02-20T09:12:30.528Z",
    __v: 0,
  },
  {
    _id: "67b6f1fe51cc7120b0c842e6",
    name: "Phòng Deluxe Giường Đôi ",
    property: {
      _id: "67b6e680f62f90f265b9bbf2",
      name: "test 111112",
      owner: "6791d10789471702c8a6f259",
      category: "6791c0c62237534d54e58bf1",
      city: "67b0a936af1c12cac8479734",
      amenities: ["67b6dcfa4b0bbffca3f45496", "67b0a553af1c12cac8479723"],
      address: "26 Phat Loc, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
      email: "owner@gmail.com",
      phone: "0123456789",
      description:
        "{`Pilgrimage Village Boutique Resort & Spa là resort mộc mạc...\\n\\nTại đây, du khách có thể lựa chọn trong số các bungalow...`}\n",
      rate: 5,
      images: [],
      createdAt: "2025-02-20T08:23:28.837Z",
      updatedAt: "2025-02-20T08:23:28.837Z",
      __v: 0,
    },
    typeroom: "67b0af0baf1c12cac847973c",
    conveniences: [
      {
        _id: "67b0b12caf1c12cac8479744",
        name: "Có bếp",
        __v: 0,
      },
      {
        _id: "67b0b124af1c12cac8479742",
        name: "Có vòi sen",
        __v: 0,
      },
    ],
    price: 11200000,
    area: 22,
    capacity: 2,
    bed: 1,
    direction: "Tây Nam",
    isAvailable: true,
    images: [
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1726242056/bxlnomhnlfdx80ejnjf8.jpg",
        publicId: "rooms/nkl3bgv8yycr3zetlwdx",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1740042750/rooms/cm3i1piip4lqkdnvikdo.jpg",
        publicId: "rooms/cm3i1piip4lqkdnvikdo",
      },
    ],
    quantity: 5,
    isLocked: false,
    totalRoom: 5,
    createdAt: "2025-02-20T09:12:30.528Z",
    updatedAt: "2025-02-20T09:12:30.528Z",
    __v: 0,
  },
  {
    _id: "67b6f1fe51cc7120b0c842e7",
    name: "Phòng Deluxe Giường Đôi ",
    property: {
      _id: "67b6e680f62f90f265b9bbf2",
      name: "test 111112",
      owner: "6791d10789471702c8a6f259",
      category: "6791c0c62237534d54e58bf1",
      city: "67b0a936af1c12cac8479734",
      amenities: ["67b6dcfa4b0bbffca3f45496", "67b0a553af1c12cac8479723"],
      address: "26 Phat Loc, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
      email: "owner@gmail.com",
      phone: "0123456789",
      description:
        "{`Pilgrimage Village Boutique Resort & Spa là resort mộc mạc...\\n\\nTại đây, du khách có thể lựa chọn trong số các bungalow...`}\n",
      rate: 5,
      images: [],
      createdAt: "2025-02-20T08:23:28.837Z",
      updatedAt: "2025-02-20T08:23:28.837Z",
      __v: 0,
    },
    typeroom: "67b0af0baf1c12cac847973c",
    conveniences: [
      {
        _id: "67b0b12caf1c12cac8479744",
        name: "Có bếp",
        __v: 0,
      },
      {
        _id: "67b0b124af1c12cac8479742",
        name: "Có vòi sen",
        __v: 0,
      },
    ],
    price: 11200000,
    area: 22,
    capacity: 2,
    bed: 1,
    direction: "Tây Nam",
    isAvailable: true,
    images: [
      {
        url: "public/images/cantho.jpg",
        publicId: "rooms/nkl3bgv8yycr3zetlwdx",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1740042750/rooms/cm3i1piip4lqkdnvikdo.jpg",
        publicId: "rooms/cm3i1piip4lqkdnvikdo",
      },
    ],
    quantity: 5,
    isLocked: false,
    totalRoom: 5,
    createdAt: "2025-02-20T09:12:30.528Z",
    updatedAt: "2025-02-20T09:12:30.528Z",
    __v: 0,
  },
];
const properties = {
  _id: "67b7091caf8b0940ad8a30b4",
  name: "test 111112",
  owner: "6791d10789471702c8a6f259",
  category: {
    _id: "6791c0c62237534d54e58bf1",
    name: "Khách sạn",
    description: "des",
    __v: 0,
  },
  city: {
    _id: "67b0a936af1c12cac8479734",
    name: "Hà Nội",
    image: {
      url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1739630902/cities/hri7obsm4eqdtyn5rm6y.jpg",
      publicId: "cities/hri7obsm4eqdtyn5rm6y",
    },
    country: "Vietnam",
    __v: 0,
  },
  amenities: [
    {
      _id: "67b0a553af1c12cac8479723",
      name: "Quầy bar",
      __v: 0,
    },
    {
      _id: "67b6dcfa4b0bbffca3f45496",
      name: "Test",
      __v: 0,
    },
  ],
  address: "26 Phat Loc, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
  email: "owner@gmail.com",
  phone: "0123456789",
  description:
    "Pilgrimage Village Boutique Resort & Spa là resort mộc mạc...\n\nTại đây, du khách có thể lựa chọn trong số các bungalow...\n",
  rate: 5,
  images: [
    {
      url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1740048663/properties/j9jiz6mt8i4v557008rr.jpg",
      publicId: "properties/j9jiz6mt8i4v557008rr",
    },
    {
      url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1740048664/properties/vnkwyuy2oryctxfgiwgn.jpg",
      publicId: "properties/vnkwyuy2oryctxfgiwgn",
    },
    {
      url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1740048665/properties/k2kgirt5oylfd712zf5y.jpg",
      publicId: "properties/k2kgirt5oylfd712zf5y",
    },
    {
      url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1740048666/properties/eenhtqtffbaksrmezhus.jpg",
      publicId: "properties/eenhtqtffbaksrmezhus",
    },
    {
      url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1740048667/properties/k7fqbneui5nmkhvm7zbg.jpg",
      publicId: "properties/k7fqbneui5nmkhvm7zbg",
    },
    {
      url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1740048668/properties/y4jch4wluw6dsc0iidng.jpg",
      publicId: "properties/y4jch4wluw6dsc0iidng",
    },
  ],
  createdAt: "2025-02-20T10:51:09.007Z",
  updatedAt: "2025-02-20T10:51:09.007Z",
  __v: 0,
};
const PropertyPage = () => {
  const property = properties;
  const [isModalVisible, setIsModalVisible] = useState(false);
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
              { key: "part-2", href: "#part-2", title: "Thông tin & giá" },
              { key: "part-3", href: "#part-3", title: "Tiện nghi" },
              { key: "part-4", href: "#part-5", title: "Đánh giá" },
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
              <MapComponent />
            </Col>
          </Row>
          <p className="whitespace-pre-line mt-8 mb-8">
            {property.description}
          </p>
        </div>
        <div id="part-2" className="w-full h-full mt-4">
          <AvailableRooms dataSource={rooms} />
        </div>
        <div id="part-3" className="w-full h-full mt-4">
          <h1 className="text-2xl font-bold mb-4">Tiện nghi</h1>
          <PropertyAmenities amenities={property.amenities} />
        </div>
        <div id="part-4" className="w-full h-full mt-16">
          <h1 className="text-2xl font-bold mb-4">Đánh giá của khách</h1>
          <Review />
        </div>
      </div>
      <ImageModal
        isVisible={isModalVisible}
        handleClose={handleCloseModal}
        images={property.images.map((img) => img.url)}
      />
    </div>
  );
};

export default PropertyPage;
