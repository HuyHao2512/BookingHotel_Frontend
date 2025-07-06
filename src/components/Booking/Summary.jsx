import React, { useEffect } from "react";
import { useBooking } from "../../contexts/BookingContext";

const Summary = ({ booking }) => {
  const { updateBooking } = useBooking();

  const total = booking.rooms.reduce((acc, room) => {
    return acc + room.price * room.quantity;
  }, 0);
  const finalPrice = total;
  useEffect(() => {
    updateBooking({ totalPrice: total, finalPrice: finalPrice });
  }, [total]);
  return (
    <div className="bg-white border border-blue-200 p-4 mt-4">
      <h3 className="text-lg font-semibold mb-4">Tóm tắt đơn đặt phòng</h3>
      <h3 className="flex justify-between">
        <span>Chỗ ở:</span>
        <span>{booking.propertyName}</span>
      </h3>
      <div className="mt-4">
        <hr />
        {booking.rooms.map((room, index) => (
          <div key={index}>
            <p className="flex justify-between mt-3">
              <span>Phòng:</span>
              <span>{room.name}</span>
            </p>
            <p className="flex justify-between">
              <span>Số lượng:</span>
              <span>{room.quantity}</span>
            </p>
            <p className="flex justify-between">
              <span>Giá:</span>
              <span>{new Intl.NumberFormat("vi-VN").format(room.price)} ₫</span>
            </p>
            <hr />
          </div>
        ))}

        <p className="flex justify-between mt-3 ">
          <span>Ngày nhận phòng:</span>
          <span>{booking.checkIn}</span>
        </p>
        <p className="flex justify-between ">
          <span>Ngày trả phòng:</span>
          <span>{booking.checkOut}</span>
        </p>
        <hr />
        <p className="flex justify-between mt-3">
          <span>Giảm giá:</span>
          <span>{booking.discount || 0} %</span>
        </p>

        <p className="flex justify-between mt-3 font-semibold">
          <span>Tổng cộng:</span>
          <span>
            {new Intl.NumberFormat("vi-VN").format(
              finalPrice - (finalPrice * (booking.discount || 0)) / 100
            )}
            đ
          </span>
        </p>
      </div>
    </div>
  );
};

export default Summary;
