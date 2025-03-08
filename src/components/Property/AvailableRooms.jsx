import { Button, Typography, DatePicker, Row, Col, message } from "antd";
import { useState } from "react";
import { useBooking } from "../../contexts/BookingContext";
import useAvailableRooms from "../../hooks/useAvailableRooms";
import { useParams } from "react-router-dom";
import RoomTable from "./RoomTable";
import RoomModal from "../Modal/RoomModal";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;
const { RangePicker } = DatePicker;

const AvailableRooms = ({ dataSource }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateBooking } = useBooking(); // Gọi từ context
  const [checkInDate, setcheckInDate] = useState(dayjs());
  const [checkOutDate, setcheckOutDate] = useState(dayjs().add(1, "day"));
  const checkIn = checkInDate.format("YYYY-MM-DD");
  const checkOut = checkOutDate.format("YYYY-MM-DD");
  const [rooms, setRooms] = useState(
    dataSource.map((room) => ({ ...room, selectedQuantity: 0 }))
  );

  // Đổi tên biến trả về từ hook để tránh nhầm lẫn
  const {
    data: availableRoomsData,
    isLoading,
    isError,
  } = useAvailableRooms(id, checkIn, checkOut);
  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      message.error("Vui lòng chọn ngày để kiểm tra");
      return;
    }
    if (!availableRoomsData) {
      message.error("Không có dữ liệu phòng khả dụng");
      return;
    }
    // Cập nhật danh sách phòng mới từ dữ liệu trả về của API
    setRooms(
      availableRoomsData.map((room) => ({ ...room, selectedQuantity: 0 }))
    );
  };
  const handleConfirmBooking = () => {
    const selectedRooms = rooms
      .filter((room) => room.selectedQuantity > 0)
      .map((room) => ({
        room: room._id,
        name: room.name,
        quantity: room.selectedQuantity,
        price: room.price,
      }));

    if (selectedRooms.length === 0) {
      message.error("Vui lòng chọn ít nhất một phòng");
      return;
    }

    updateBooking({
      rooms: selectedRooms,
      checkIn,
      checkOut,
      user: localStorage.getItem("userId"),
    });
    console.log("Đặt phòng thành công:", selectedRooms);
    navigate("/booking-info");
  };

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
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
          <Text strong>Chọn ngày để kiểm tra phòng trống:</Text>
        </Col>
        <Col span={5}>
          <RangePicker
            format="DD-MM-YYYY"
            className="mb-4"
            value={[checkInDate, checkOutDate]}
            onChange={(values) => {
              setcheckInDate(values?.[0]);
              setcheckOutDate(values?.[1]);
            }}
          />
        </Col>
        <Col span={6}>
          <Button type="primary" className="mb-4 ml-4" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </Col>
      </Row>
      <RoomTable
        rooms={rooms}
        handleQuantityChange={handleQuantityChange}
        showRoomInfo={showRoomInfo}
      />
      <Button type="primary" className="mt-4" onClick={handleConfirmBooking}>
        Đặt phòng
      </Button>
      <RoomModal
        selectedRoom={selectedRoom}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default AvailableRooms;
