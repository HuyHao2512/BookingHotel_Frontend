import dayjs from "dayjs";
const BookingDetails = ({ checkIn, checkOut }) => {
  const checkInDate = dayjs(checkIn); // Ngày nhận phòng
  const checkOutDate = dayjs(checkOut); // Ngày trả phòng

  const duration = checkOutDate.diff(checkInDate, "day"); // Số ngày lưu trú
  return (
    <div className="border p-4 w-[250px] text-xs border-blue-200 mt-2">
      <h2 className="font-semibold bg-blue-100 text-black px-4 py-2 -mx-4 -mt-4">
        Chi tiết đặt phòng của bạn
      </h2>
      <div className="mt-2">
        <p className="font-semibold ">Nhận phòng:</p>
        <p>
          Từ <span className="font-bold">14:00</span> ngày{" "}
          <span className="font-bold">{checkIn}</span>
        </p>
      </div>
      <div className="mt-2">
        <p className="font-semibold">Trả phòng:</p>
        <p>
          Đến <span className="font-bold">12:00</span> ngày{" "}
          <span className="font-bold">{checkOut}</span>
        </p>
      </div>
      <div className="mt-2">
        <p className="font-semibold">
          Tổng thời gian lưu trú: <span className="font-bold">{duration} </span>
          ngày
        </p>
      </div>
    </div>
  );
};

export default BookingDetails;
