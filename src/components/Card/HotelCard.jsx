import React from "react";
import { Button, Col, Rate, Row } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import ButtonDetail from "../Button/ButtonDetail";
const HotelCard = ({ hotel }) => {
  return (
    <div className="p-4 mb-4 border-2 border-radius-20 shadow-lg rounded-xl">
      <Row>
        <Col span={6}>
          <img
            src={hotel.images[0].url}
            alt={hotel.name}
            className="w-60 h-48 object-cover rounded-xl"
          />
        </Col>
        <Col span={18}>
          <h2 className="ml-4 mt-2 text-xl text-blue-700">
            {hotel.name} <Rate value={hotel.rate} />
          </h2>
          <p className="ml-4 text-gray-500">
            <EnvironmentOutlined /> &nbsp;
            {hotel.address}
          </p>
          <p className="ml-4 mt-2 text-md line-clamp-3">{hotel.description}</p>
          <ButtonDetail className="ml-4 mt-2" />
        </Col>
      </Row>
    </div>
  );
};
export default HotelCard;
