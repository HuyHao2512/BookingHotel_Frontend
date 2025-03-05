import React from "react";
import { Card, Tag, Typography, Button, Rate, message } from "antd";
import { EnvironmentOutlined, ExpandOutlined } from "@ant-design/icons";
import ButtonLike from "../Button/ButtonLike";
import useGetPropertyById from "../../hooks/useGetPropertyById";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;
function PropertyCard({ hotel }) {
  const navigate = useNavigate();
  const handleViewDetail = (hotel) => {
    navigate(`/property/${hotel._id}`);
    console.log(hotel);
  };

  return (
    <div className="rounded-xl overflow-hidden w-76 mb-8 flex items-center justify-center">
      <div className="group transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl mt-2">
        <button onClick={() => handleViewDetail(hotel)}>
          <Card
            cover={
              <div className="overflow-hidden bg-white p-1 rounded-t-lg border-b-2 border-blue-500 border-dashed">
                <img
                  alt={hotel?.name}
                  src={hotel?.image}
                  className="h-[250px] w-full object-cover rounded-t-lg"
                />
              </div>
            }
            className="w-[300px] border-2 border-blue-500 rounded-lg p-1 border-dashed"
          >
            <Title level={4} className="line-clamp-2">
              {hotel.name}
            </Title>
            <Text type="secondary">
              <EnvironmentOutlined /> {hotel.address}
            </Text>
            <button
              className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md"
              onClick={(event) => {
                event.stopPropagation(); // Ngăn chặn sự kiện lan truyền lên button cha
                handleLike(hotel); // Gọi hàm xử lý khi bấm like
              }}
            >
              <ButtonLike />
            </button>

            <div className="flex justify-center items-center">
              <Rate allowHalf defaultValue={hotel.rate} disabled />
            </div>
          </Card>
        </button>
      </div>
    </div>
  );
}

export default PropertyCard;
