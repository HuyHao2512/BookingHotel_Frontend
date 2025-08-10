import { Button, Typography, DatePicker, Row, Col, message, Spin } from "antd";
import { useContext, useState } from "react";
import { useBooking } from "../../contexts/BookingContext";
import useAvailableRooms from "../../hooks/useAvailableRooms";
import { useParams } from "react-router-dom";
import RoomTable from "./RoomTable";
import RoomModal from "../Modal/RoomModal";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
const { Text } = Typography;
const { RangePicker } = DatePicker;

const AvailableRooms = ({ dataSource }) => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { updateBooking } = useBooking();
  const [checkInDate, setcheckInDate] = useState(dayjs().add(1, "day"));
  const [checkOutDate, setcheckOutDate] = useState(dayjs().add(2, "day"));
  const [checkIn, setCheckIn] = useState(checkInDate.format("YYYY-MM-DD"));
  const [checkOut, setCheckOut] = useState(checkOutDate.format("YYYY-MM-DD"));
  const [rooms, setRooms] = useState(
    dataSource.map((room) => ({ ...room, selectedQuantity: 0 }))
  );
  const [hasSearched, setHasSearched] = useState(false); // Thêm state để kiểm tra đã tìm kiếm chưa

  const {
    data: availableRoomsData,
    isLoading,
    isError,
  } = useAvailableRooms(id, checkIn, checkOut);

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const handleSearch = () => {
    if (!checkInDate || !checkOutDate) {
      message.error("Vui lòng chọn ngày để kiểm tra");
      return;
    }

    // Cập nhật checkIn và checkOut khi nhấn tìm kiếm
    const newCheckIn = checkInDate.format("YYYY-MM-DD");
    const newCheckOut = checkOutDate.format("YYYY-MM-DD");
    setCheckIn(newCheckIn);
    setCheckOut(newCheckOut);

    if (!availableRoomsData) {
      message.error("Không có dữ liệu phòng khả dụng");
      return;
    }

    // Cập nhật danh sách phòng và đánh dấu đã tìm kiếm
    setRooms(
      availableRoomsData.map((room) => ({ ...room, selectedQuantity: 0 }))
    );
    setHasSearched(true);
  };

  const handleConfirmBooking = () => {
    if (!user) {
      message.error("Vui lòng đăng nhập để đặt phòng");
      return;
    }

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
    navigate("/booking-info");
  };

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleQuantityChange = (value, room) => {
    if (!hasSearched) {
      message.warning("Vui lòng nhấn Tìm kiếm trước khi chọn số lượng phòng");
      return;
    }

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

  if (isLoading)
    return (
      <div>
        <Spin size="large" />
      </div>
    );
  if (isError) return <div>Error</div>;

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
              setHasSearched(false); // Reset trạng thái tìm kiếm khi thay đổi ngày
            }}
            disabledDate={disabledDate}
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
        disableInput={!hasSearched} // Truyền prop để disable input khi chưa tìm kiếm
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
