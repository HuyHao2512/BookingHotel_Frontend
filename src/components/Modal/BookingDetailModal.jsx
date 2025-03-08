import React from "react";
import { Modal, Tag, Button } from "antd";
import { FaCalendarCheck, FaMoneyCheckAlt, FaHotel } from "react-icons/fa";

const BookingDetailModal = ({ visible, booking, onClose }) => {
  if (!booking) return null;

  return (
    <Modal
      title={
        <div className="flex items-center">
          <FaHotel className="text-2xl text-blue-600 mr-2" />
          <span className="text-xl font-semibold text-blue-700">
            Chi tiết đơn đặt phòng
          </span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
      ]}
      width={600}
    >
      <div className="space-y-4">
        {/* Thông tin khách sạn */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {booking.propertyName}
          </h3>
          <Tag color={booking.isPaid ? "green" : "red"} className="mt-2">
            {booking.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
          </Tag>
        </div>

        {/* Thông tin người đặt */}
        <div>
          <p>
            <strong>Tên người đặt:</strong> {booking.name}
          </p>
          <p>
            <strong>Email:</strong> {booking.email}
          </p>
        </div>

        {/* Thông tin phòng */}
        <div>
          <h4 className="font-semibold text-gray-700">Phòng đã đặt:</h4>
          {booking.rooms.map((room, index) => (
            <div
              key={index}
              className="flex justify-between mt-2 text-sm bg-gray-50 p-2 rounded"
            >
              <span>
                {room.quantity}x {room.name}
              </span>
              <span>{room.price.toLocaleString("vi-VN")} VND</span>
            </div>
          ))}
        </div>

        {/* Ngày check-in/check-out */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <FaCalendarCheck className="text-blue-500 mr-2" />
            <p className="mt-4">
              <strong>Check-in:</strong>{" "}
              {new Date(booking.checkIn).toLocaleDateString("vi-VN")}
            </p>
          </div>
          <div className="flex items-center">
            <FaCalendarCheck className="text-blue-500 mr-2" />
            <p className="mt-4">
              <strong>Check-out:</strong>{" "}
              {new Date(booking.checkOut).toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>

        {/* Tổng tiền */}
        <div className="flex items-center justify-end">
          <FaMoneyCheckAlt className="text-green-500 mr-2" />
          <p className="text-lg font-bold text-green-600 mt-4">
            Tổng tiền: {booking.totalPrice.toLocaleString("vi-VN")} VND
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default BookingDetailModal;
