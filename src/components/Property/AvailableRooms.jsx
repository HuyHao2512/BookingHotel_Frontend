import { Button, Typography, DatePicker, Row, Col } from "antd";
import { useState, useRef } from "react";
import RoomTable from "./RoomTable";
import RoomModal from "../Modal/RoomModal";
const { Text } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

const AvailableRooms = ({ dataSource }) => {
  const [rooms, setRooms] = useState(
    dataSource.map((room) => ({ ...room, selectedQuantity: 0 }))
  );
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleQuantityChange = (value, room) => {
    setRooms((prevRooms) =>
      prevRooms.map((r) =>
        r._id === room._id ? { ...r, selectedQuantity: value } : r
      )
    );
  };

  const showRoomInfo = (room) => {
    setSelectedRoom(room);
    setIsModalVisible(true);
    console.log("Chi tiết phòng:", room);
  };
  return (
    <div className="w-full h-full mt-4">
      <h1 className="text-2xl font-bold mb-4">Phòng trống</h1>
      <Row>
        <Col span={5}>
          <Text strong>Chọn ngày để kiếm tra phòng trống:</Text>
        </Col>
        <Col span={5}>
          <RangePicker
            format={dateFormat}
            className="mb-4"
            value={[startDate, endDate]}
            onChange={(values) => {
              setStartDate(values?.[0]);
              setEndDate(values?.[1]);
            }}
          />
        </Col>
        <Col span={6}>
          <Button type="primary" className="mb-4 ml-4">
            Tìm kiếm
          </Button>
        </Col>
      </Row>
      {/* <RoomTable
        rooms={rooms}
        setRooms={setRooms}
        showRoomInfo={(room) => {
          setSelectedRoom(room);
          setIsModalVisible(true);
        }}
      /> */}
      <RoomTable
        rooms={rooms}
        handleQuantityChange={handleQuantityChange}
        showRoomInfo={showRoomInfo}
      />
      <RoomModal
        selectedRoom={selectedRoom}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default AvailableRooms;
