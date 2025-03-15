import React from "react";
import { Card, Tag, Spin, Empty, Button } from "antd";
import { motion } from "framer-motion";
import {
  FaCalendarCheck,
  FaMoneyCheckAlt,
  FaHotel,
  FaEye,
} from "react-icons/fa";
import BookingDetailModal from "../../components/Modal/BookingDetailModal"; // Import component modal
import useBookingByUser from "../../hooks/useBookingByUser";
import { useParams } from "react-router-dom";
const BookingHistory = () => {
  const rawData = [
    {
      _id: "67cbce671678e307228f8b19",
      propertyName: "InterContinental Danang Sun Peninsula Resort by IHG",
      rooms: [
        {
          room: "67c958ed4e130ee04bcdf5ae",
          name: "Suite Có Giường Cỡ King, Sân Hiên Và Tầm Nhìn Ra Biển",
          quantity: 1,
          price: 23645000,
        },
        {
          room: "67c958ed4e130ee04bcdf5af",
          name: "Deluxe Room",
          quantity: 2,
          price: 15000000,
        },
      ],
      name: "Huy Hao",
      checkIn: "2025-03-10T00:00:00.000Z",
      checkOut: "2025-03-12T00:00:00.000Z",
      totalPrice: 53645000,
      isPaid: false,
      email: "huyhao2512@gmail.com",
    },
    {
      _id: "67cbce671678e307228f8b18",
      propertyName: "InterContinental Danang Sun Peninsula Resort by IHG",
      rooms: [
        {
          room: "67c958ed4e130ee04bcdf5ae",
          name: "Suite Có Giường Cỡ King, Sân Hiên Và Tầm Nhìn Ra Biển",
          quantity: 1,
          price: 23645000,
        },
        {
          room: "67c958ed4e130ee04bcdf5af",
          name: "Deluxe Room",
          quantity: 2,
          price: 15000000,
        },
      ],
      name: "Huy Hao",
      checkIn: "2025-03-10T00:00:00.000Z",
      checkOut: "2025-03-12T00:00:00.000Z",
      totalPrice: 53645000,
      isPaid: false,
      email: "huyhao2512@gmail.com",
    },
  ];
  const { id } = useParams();
  // const {
  //   data: rawData,
  //   isloading: isRawDataLoading,
  //   isError: isRawDataError,
  // } = useBookingByUser(id);
  // if (isRawDataLoading) return <h1>Đang tải...</h1>;
  // if (isRawDataError) return <h1>Đã xảy ra lỗi</h1>;
  const [visibleBookings, setVisibleBookings] = React.useState(2);
  const [loading, setLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedBooking, setSelectedBooking] = React.useState(null);

  const bookingsPerPage = 2;

  // 🔹 Hàm xử lý nút "Xem thêm"
  const handleShowMore = () => {
    setVisibleBookings((prev) => prev + bookingsPerPage);
  };

  // 🔹 Hàm mở modal
  const showModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalVisible(true);
  };

  // 🔹 Hàm đóng modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedBooking(null);
  };

  // 🔹 Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-4 md:p-8 flex justify-center items-start">
      <div className="w-full max-w-4xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Lịch sử đặt phòng
        </motion.h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" tip="Đang tải dữ liệu..." />
          </div>
        ) : rawData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Empty
              image={<FaHotel className="text-6xl text-gray-400 mx-auto" />}
              description={
                <span className="text-gray-500">
                  Bạn chưa có lịch sử đặt phòng nào.
                </span>
              }
            />
          </motion.div>
        ) : (
          <>
            {rawData.slice(0, visibleBookings).map((booking, index) => (
              <motion.div
                key={booking._id}
                className="mb-6"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="rounded-2xl shadow-lg border border-gray-200 bg-white p-4 md:p-6"
                  style={{
                    background: "linear-gradient(145deg, #ffffff, #f9fafb)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <FaHotel className="text-2xl text-blue-600 mr-2" />
                      <h3 className="text-xl md:text-2xl font-semibold text-blue-700 tracking-tight mt-3">
                        {booking.propertyName}
                      </h3>
                    </div>
                    <Tag
                      color={booking.isPaid ? "green" : "red"}
                      className="text-sm font-semibold px-3 py-1 rounded-full"
                    >
                      {booking.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                    </Tag>
                  </div>

                  <div className="mt-3 space-y-3">
                    {booking.rooms.map((room, roomIndex) => (
                      <div
                        key={roomIndex}
                        className="flex justify-between items-center text-sm md:text-base bg-gray-50 p-3 rounded-lg border border-gray-100"
                      >
                        <span className="font-medium text-gray-700">
                          {room.quantity}x {room.name}
                        </span>
                        <span className="text-blue-600 font-semibold">
                          {room.price.toLocaleString("vi-VN")} VND
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center">
                        <FaCalendarCheck className="text-blue-500 mr-2" />
                        <p className="mt-4">
                          <strong>Check-in:</strong>{" "}
                          {new Date(booking.checkIn).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                      </div>
                      <div className="flex items-center mt-2">
                        <FaCalendarCheck className="text-blue-500 mr-2" />
                        <p className="mt-4">
                          <strong>Check-out:</strong>{" "}
                          {new Date(booking.checkOut).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-right md:text-left">
                      <div className="flex items-center justify-end md:justify-start">
                        <FaMoneyCheckAlt className="text-green-500 mr-2" />
                        <p className="text-lg md:text-xl font-bold text-green-600 mt-4">
                          Tổng tiền:{" "}
                          {booking.totalPrice.toLocaleString("vi-VN")} VND
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-right">
                    <Button
                      type="default"
                      icon={<FaEye />}
                      className="border-blue-600 text-blue-600"
                      onClick={() => showModal(booking)}
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}

            {visibleBookings < rawData.length && (
              <div className="text-center mt-8">
                <Button
                  type="primary"
                  onClick={handleShowMore}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full"
                >
                  Xem thêm
                </Button>
              </div>
            )}
          </>
        )}

        {/* Sử dụng component BookingDetailModal */}
        <BookingDetailModal
          visible={isModalVisible}
          booking={selectedBooking}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default BookingHistory;
