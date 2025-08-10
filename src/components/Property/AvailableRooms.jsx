import {
  Button,
  Typography,
  DatePicker,
  Row,
  Col,
  message,
  Spin,
  Card,
} from "antd";
import { useContext, useState, useMemo, useCallback } from "react";
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

const AvailableRooms = ({ dataSource = [] }) => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { updateBooking } = useBooking();

  // State management
  const [checkInDate, setCheckInDate] = useState(dayjs().add(1, "day"));
  const [checkOutDate, setCheckOutDate] = useState(dayjs().add(2, "day"));
  const [checkIn, setCheckIn] = useState(checkInDate.format("YYYY-MM-DD"));
  const [checkOut, setCheckOut] = useState(checkOutDate.format("YYYY-MM-DD"));
  const [rooms, setRooms] = useState(
    dataSource.map((room) => ({ ...room, selectedQuantity: 0 }))
  );
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // API call with conditional fetching
  const {
    data: availableRoomsData,
    isLoading,
    isError,
  } = useAvailableRooms(id, checkIn, checkOut, { enabled: hasSearched });

  // Memoized values
  const disabledDate = useCallback((current) => {
    return current && current < dayjs().startOf("day");
  }, []);

  const selectedRoomsCount = useMemo(() => {
    return rooms.filter((room) => room.selectedQuantity > 0).length;
  }, [rooms]);

  const totalSelectedQuantity = useMemo(() => {
    return rooms.reduce((total, room) => total + room.selectedQuantity, 0);
  }, [rooms]);

  // Handlers with loading states
  const handleSearch = useCallback(async () => {
    if (!checkInDate || !checkOutDate) {
      message.error("Vui lòng chọn ngày để kiểm tra");
      return;
    }

    if (checkOutDate.isBefore(checkInDate)) {
      message.error("Ngày trả phòng phải sau ngày nhận phòng");
      return;
    }

    setIsSearching(true);

    try {
      // Cập nhật checkIn và checkOut khi nhấn tìm kiếm
      const newCheckIn = checkInDate.format("YYYY-MM-DD");
      const newCheckOut = checkOutDate.format("YYYY-MM-DD");
      setCheckIn(newCheckIn);
      setCheckOut(newCheckOut);
      setHasSearched(true);

      // Hiển thị loading trong một thời gian ngắn để tránh flash
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error) {
      message.error("Có lỗi xảy ra khi tìm kiếm");
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  }, [checkInDate, checkOutDate]);

  // Update rooms when API data changes
  useMemo(() => {
    if (availableRoomsData && hasSearched) {
      setRooms(
        availableRoomsData.map((room) => ({ ...room, selectedQuantity: 0 }))
      );
    }
  }, [availableRoomsData, hasSearched]);

  const handleConfirmBooking = useCallback(async () => {
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

    setIsBooking(true);

    try {
      await updateBooking({
        rooms: selectedRooms,
        checkIn,
        checkOut,
        user: localStorage.getItem("userId"),
      });

      message.success("Đang chuyển đến trang thông tin đặt phòng...");
      navigate("/booking-info");
    } catch (error) {
      message.error("Có lỗi xảy ra khi đặt phòng");
      console.error("Booking error:", error);
    } finally {
      setIsBooking(false);
    }
  }, [user, rooms, checkIn, checkOut, updateBooking, navigate]);

  const handleQuantityChange = useCallback(
    (value, room) => {
      if (!hasSearched) {
        message.warning("Vui lòng nhấn Tìm kiếm trước khi chọn số lượng phòng");
        return;
      }

      setRooms((prevRooms) =>
        prevRooms.map((r) =>
          r._id === room._id ? { ...r, selectedQuantity: value } : r
        )
      );
    },
    [hasSearched]
  );

  const showRoomInfo = useCallback((room) => {
    setSelectedRoom(room);
    setIsModalVisible(true);
  }, []);

  const handleDateRangeChange = useCallback((values) => {
    setCheckInDate(values?.[0]);
    setCheckOutDate(values?.[1]);
    setHasSearched(false);
    setRooms((prevRooms) =>
      prevRooms.map((room) => ({ ...room, selectedQuantity: 0 }))
    );
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalVisible(false);
    setSelectedRoom(null);
  }, []);

  // Loading state cho toàn bộ component khi đang fetch data lần đầu
  if (isLoading && hasSearched) {
    return (
      <div className="w-full h-full mt-4 flex justify-center items-center min-h-[400px]">
        <Card className="text-center p-8">
          <Spin size="large" />
          <div className="mt-4">
            <Text>Đang tìm kiếm phòng trống...</Text>
          </div>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full mt-4">
        <Card className="text-center p-8 border-red-200">
          <Text type="danger">Có lỗi xảy ra khi tải dữ liệu phòng</Text>
          <div className="mt-4">
            <Button type="primary" onClick={handleSearch}>
              Thử lại
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full h-full mt-4">
      <Card>
        <h1 className="text-2xl font-bold mb-6">Phòng trống</h1>

        <Row gutter={[16, 16]} align="middle" className="mb-6">
          <Col xs={24} sm={8} md={6}>
            <Text strong>Chọn ngày để kiểm tra phòng trống:</Text>
          </Col>
          <Col xs={24} sm={10} md={8}>
            <RangePicker
              format="DD-MM-YYYY"
              className="w-full"
              value={[checkInDate, checkOutDate]}
              onChange={handleDateRangeChange}
              disabledDate={disabledDate}
              placeholder={["Ngày nhận phòng", "Ngày trả phòng"]}
            />
          </Col>
          <Col xs={24} sm={6} md={6}>
            <Button
              type="primary"
              onClick={handleSearch}
              loading={isSearching}
              disabled={!checkInDate || !checkOutDate}
              className="w-full sm:w-auto"
            >
              {isSearching ? "Đang tìm kiếm..." : "Tìm kiếm"}
            </Button>
          </Col>
        </Row>

        {/* Hiển thị thông tin tóm tắt khi đã chọn phòng */}
        {hasSearched && selectedRoomsCount > 0 && (
          <Card
            size="small"
            className="mb-4 bg-blue-50 border-blue-200"
            title={
              <Text strong>
                Đã chọn {selectedRoomsCount} loại phòng ({totalSelectedQuantity}{" "}
                phòng)
              </Text>
            }
          />
        )}

        {/* Room Table với loading overlay */}
        <div className="relative">
          {isSearching && (
            <div className="absolute inset-0 bg-white bg-opacity-50 z-10 flex justify-center items-center">
              <Spin size="large" />
            </div>
          )}

          <RoomTable
            rooms={rooms}
            handleQuantityChange={handleQuantityChange}
            showRoomInfo={showRoomInfo}
            disableInput={!hasSearched || isSearching}
          />
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div>
            {hasSearched && (
              <Text type="secondary">
                Tìm thấy {rooms.length} loại phòng khả dụng vào ngày
              </Text>
            )}
          </div>

          <Button
            type="primary"
            size="large"
            onClick={handleConfirmBooking}
            disabled={selectedRoomsCount === 0 || !hasSearched}
            loading={isBooking}
          >
            {isBooking
              ? "Đang xử lý..."
              : `Đặt phòng ${
                  selectedRoomsCount > 0
                    ? `(${totalSelectedQuantity} phòng)`
                    : ""
                }`}
          </Button>
        </div>
      </Card>

      <RoomModal
        selectedRoom={selectedRoom}
        isVisible={isModalVisible}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default AvailableRooms;
