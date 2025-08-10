import React, { useEffect } from "react";
import { useBooking } from "../../contexts/BookingContext";
import dayjs from "dayjs";

const Summary = ({ booking }) => {
  const { updateBooking } = useBooking();

  // Tính số ngày thuê
  const calculateNights = () => {
    if (!booking.checkIn || !booking.checkOut) return 0;
    const checkIn = dayjs(booking.checkIn);
    const checkOut = dayjs(booking.checkOut);
    return checkOut.diff(checkIn, "day");
  };

  const nights = calculateNights();

  // Tính tổng tiền (giá phòng * số lượng * số ngày)
  const total = booking.rooms.reduce((acc, room) => {
    return acc + room.price * room.quantity * nights;
  }, 0);

  // Tính giá cuối cùng sau khi áp dụng giảm giá
  const finalPrice = total - (total * (booking.discount || 0)) / 100;

  useEffect(() => {
    updateBooking({
      totalPrice: total,
      finalPrice: finalPrice,
      nights: nights, // Có thể thêm số đêm vào booking nếu cần
    });
  }, [total, finalPrice, nights]);

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
              <span>Giá/đêm:</span>
              <span>{new Intl.NumberFormat("vi-VN").format(room.price)} ₫</span>
            </p>
            <p className="flex justify-between">
              <span>Số đêm:</span>
              <span>{nights} đêm</span>
            </p>
            <p className="flex justify-between">
              <span>Thành tiền:</span>
              <span>
                {new Intl.NumberFormat("vi-VN").format(
                  room.price * room.quantity * nights
                )}{" "}
                ₫
              </span>
            </p>
            <hr />
          </div>
        ))}

        <p className="flex justify-between mt-3">
          <span>Ngày nhận phòng:</span>
          <span>{booking.checkIn}</span>
        </p>
        <p className="flex justify-between">
          <span>Ngày trả phòng:</span>
          <span>{booking.checkOut}</span>
        </p>
        <p className="flex justify-between">
          <span>Tổng số đêm:</span>
          <span>{nights} đêm</span>
        </p>
        <hr />
        <p className="flex justify-between mt-3">
          <span>Giảm giá:</span>
          <span>{booking.discount || 0}%</span>
        </p>

        <p className="flex justify-between mt-3 font-semibold">
          <span>Tổng cộng:</span>
          <span>{new Intl.NumberFormat("vi-VN").format(finalPrice)} ₫</span>
        </p>
      </div>
    </div>
  );
};

export default Summary;
