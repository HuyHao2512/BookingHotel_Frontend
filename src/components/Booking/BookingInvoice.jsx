import React from "react";
import { Card, Divider } from "antd";
const BookingInvoice = ({ customer, room, totalPrice, paymentMethod }) => {
  return (
    <Card className="border border-gray-300 w-full max-w-md mx-auto p-4 mt-4">
      <h2 className="text-xl font-semibold text-center mb-2">
        THÔNG TIN HÓA ĐƠN
      </h2>
      <Divider />

      {/* Thông tin khách hàng */}
      <div className="flex justify-between mb-2">
        <span className="font-medium">Khách hàng:</span>
        <span>{customer.name}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="font-medium">Email:</span>
        <span>{customer.email}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="font-medium">Số điện thoại:</span>
        <span>{customer.phone}</span>
      </div>

      {/* Thông tin phòng */}
      <div className="flex justify-between mb-2">
        <span className="font-medium">Loại phòng:</span>
        <span>{room.type}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="font-medium">Số phòng:</span>
        <span>{room.number}</span>
      </div>
      {/* Tổng tiền */}
      <Divider />
      <div className="flex justify-between text-lg font-bold">
        <span>Tổng tiền:</span>
        <span className="text-red-500">{totalPrice.toLocaleString()} VND</span>
      </div>

      {/* Hình thức thanh toán */}
      <div className="flex justify-between mt-3">
        <span className="font-medium">Thanh toán:</span>
        <span>{paymentMethod === 1 ? "Nhận phòng" : "Thanh toán trước"}</span>
      </div>
    </Card>
  );
};

export default BookingInvoice;
