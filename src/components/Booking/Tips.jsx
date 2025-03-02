import React from "react";

const Tips = () => {
  return (
    <div className="border p-4 w-[250px] text-xs border-blue-200 mt-2">
      <h2 className="font-semibold bg-blue-100 text-black px-4 py-2 -mx-4 -mt-4">
        Mách nhỏ bạn
      </h2>
      <div className="mt-2 flex item-center">
        <p>
          <span className="font-bold">Linh hoạt:</span> Bạn có thể hủy phòng
          miễn phí đến 12h ngày 12 tháng 3
        </p>
      </div>
      <div className="mt-2 flex item-center">
        <p>
          <span className="font-bold">Thanh toán:</span> Với đơn đặt phòng từ
          1.000.000đ, bạn phải thanh toán trước 50%.
        </p>
      </div>
    </div>
  );
};
export default Tips;
