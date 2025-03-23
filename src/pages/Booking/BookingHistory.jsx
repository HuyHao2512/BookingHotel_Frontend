import React from "react";
import { Card, Tag, Spin, Empty, Button, message, Popconfirm } from "antd";
import { motion } from "framer-motion";
import {
  FaCalendarCheck,
  FaMoneyCheckAlt,
  FaHotel,
  FaEye,
} from "react-icons/fa";
import BookingDetailModal from "../../components/Modal/BookingDetailModal";
import useBookingByUser from "../../hooks/useBookingByUser";
import { useParams } from "react-router-dom";
import * as ownerService from "../../services/owner.service";
import { useMutation } from "@tanstack/react-query";

const BookingHistory = () => {
  const { id } = useParams();
  const {
    data: bookingData,
    isLoading: isBookingDataLoading,
    isError: isBookingDataError,
    error,
  } = useBookingByUser(id, {
    enabled: !!id, // Chỉ gọi khi id hợp lệ
    staleTime: 5 * 60 * 1000, // Cache 5 phút
    cacheTime: 10 * 60 * 1000, // Giữ cache 10 phút
  });

  const [visibleBookings, setVisibleBookings] = React.useState(2);
  const [loading, setLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedBooking, setSelectedBooking] = React.useState(null);

  const bookingsPerPage = 2;

  const handleShowMore = () => {
    setVisibleBookings((prev) => prev + bookingsPerPage);
  };

  const showModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedBooking(null);
  };

  const cancelMutation = useMutation({
    mutationFn: (id) => ownerService.releaseRoom(id),
    onSuccess: () => {
      message.success("Đã hủy đơn đặt phòng!");
    },
    onError: (error) => {
      message.error("Có lỗi khi hủy: " + error.message);
    },
  });

  const confirm = (e) => {
    cancelMutation.mutate(e);
  };

  const cancel = (e) => {
    console.log(e);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (isBookingDataLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  if (isBookingDataError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-80"
      >
        <Empty
          image={<FaHotel className="text-6xl text-gray-400 mx-auto" />}
          description={
            <span className="text-gray-500">
              Đã xảy ra lỗi: {error?.message || "Không thể tải dữ liệu."}
            </span>
          }
        />
      </motion.div>
    );
  }

  if (!bookingData || bookingData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-80"
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
    );
  }
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
        ) : (
          <>
            {bookingData.slice(0, visibleBookings).map((booking, index) => (
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
                      <p className="mt-2">
                        <strong>Trạng thái: </strong>
                        {booking.status === "pending"
                          ? "Chờ xác nhận"
                          : booking.status === "confirmed"
                          ? "Đã xác nhận"
                          : "Đã hủy"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end gap-4">
                    {booking.status === "pending" && (
                      <Popconfirm
                        title="Hủy đặt phòng"
                        description="Bạn có chắc chắn muốn hủy đặt phòng? Hành động này không thể hoàn tác."
                        onConfirm={() => confirm(booking._id)}
                        onCancel={cancel}
                        okText="ĐỒNG Ý"
                        cancelText="HỦY"
                      >
                        <Button
                          type="default"
                          className="border-yellow-500 text-yellow-500 hover:bg-yellow-100 px-4 py-2 rounded-lg transition"
                        >
                          Hủy đặt phòng
                        </Button>
                      </Popconfirm>
                    )}
                    <Button
                      type="default"
                      icon={<FaEye />}
                      className="border-blue-600 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition flex items-center gap-2"
                      onClick={() => showModal(booking)}
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}

            {visibleBookings < bookingData.length && (
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
