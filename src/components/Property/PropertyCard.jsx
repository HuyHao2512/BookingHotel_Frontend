import React from "react";
import { Card, Tag, Typography, Button, Rate } from "antd";
import { EnvironmentOutlined, ExpandOutlined } from "@ant-design/icons";
import ButtonLike from "../Button/ButtonLike";

const { Title, Text } = Typography;
function PropertyCard({ hotel }) {
  return (
    <div className="rounded-xl overflow-hidden w-76 mb-8 flex items-center justify-center">
      <Card
        cover={
          <img
            alt={hotel?.name}
            src={hotel?.images?.[0].url}
            style={{ height: 200, width: "100%", objectFit: "cover" }}
          />
        }
        style={{ width: 300, borderRadius: 10 }}
      >
        <Title level={4}>{hotel.name}</Title>
        <Text type="secondary">
          <EnvironmentOutlined /> {hotel.address}
        </Text>
        <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
          <ButtonLike />
        </button>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Rate allowHalf defaultValue={hotel.rate} />
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          {hotel?.amenities?.map((amenity, index) => (
            <Tag key={index} color="green">
              {amenity}
            </Tag>
          ))}
        </div>
        <Button
          type="primary"
          block
          icon={<ExpandOutlined />}
          style={{ marginTop: 10 }}
        >
          Xem chi tiết
        </Button>
      </Card>
    </div>
  );
}

export default PropertyCard;
