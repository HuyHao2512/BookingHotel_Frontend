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
          miễn phí trước khi phòng được xác nhận
        </p>
      </div>
      <div className="mt-2 flex item-center">
        <p>
          <span className="font-bold">Thanh toán:</span> Bạn có thể thanh toán
          trực tiếp hoặc qua các ví điện tử
        </p>
      </div>
    </div>
  );
};
export default Tips;
