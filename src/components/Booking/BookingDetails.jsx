const BookingDetails = () => {
  return (
    <div className="border p-4 w-[250px] text-xs border-blue-200 mt-2">
      <h2 className="font-semibold bg-blue-100 text-black px-4 py-2 -mx-4 -mt-4">
        Chi tiết đặt phòng của bạn
      </h2>
      <div className="mt-2">
        <p className="font-semibold ">Nhận phòng:</p>
        <p>
          Thứ 6 <span className="font-bold">14 tháng 3</span> 2025 từ 14:00
        </p>
      </div>
      <div className="mt-2">
        <p className="font-semibold">Trả phòng:</p>
        <p>
          Thứ 7 <span className="font-bold">15 tháng 3</span> 2025 đến 12:00
        </p>
      </div>
      <div className="mt-2">
        <p className="font-semibold">Tổng thời gian lưu trú:</p>
        <p>1 đêm</p>
      </div>
    </div>
  );
};

export default BookingDetails;
