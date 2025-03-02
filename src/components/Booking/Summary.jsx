import React from "react";

const Summary = () => {
  return (
    <div className="bg-white border border-blue-200 p-4 mt-4">
      <h3 className="text-lg font-semibold mb-4">Tóm tắt đơn đặt phòng</h3>
      <h3 className="flex justify-between">
        <span>Chỗ ở:</span>
        <span>Khách sạn ABC</span>
      </h3>
      <div className="mt-4">
        <hr />
        <p className="flex justify-between mt-3">
          <span>Phòng:</span>
          <span>Phòng Deluxu tiêu chuẩn</span>
        </p>
        <p className="flex justify-between">
          <span>Số lượng:</span>
          <span>1</span>
        </p>
        <p className="flex justify-between">
          <span>Giá phòng:</span>
          <span>1.000.000đ</span>
        </p>
        <hr />
        <p className="flex justify-between mt-3 ">
          <span>Phòng:</span>
          <span>Phòng Deluxu tiêu chuẩn</span>
        </p>
        <p className="flex justify-between">
          <span>Số lượng:</span>
          <span>1</span>
        </p>
        <p className="flex justify-between">
          <span>Giá phòng:</span>
          <span>1.000.000đ</span>
        </p>
        <hr />
        <hr />
        <p className="flex justify-between mt-3 ">
          <span>Ngày nhận phòng:</span>
          <span>Thứ 6, 14 tháng 3, 2025</span>
        </p>
        <p className="flex justify-between ">
          <span>Ngày trả phòng:</span>
          <span>Thứ 7, 15 tháng 3, 2025</span>
        </p>
        <hr />
        <p className="flex justify-between mt-3 ">
          <span>Giảm giá:</span>
          <span>0đ</span>
        </p>
        <p className="flex justify-between mt-3 ">
          <span>Thuế:</span>
          <span>20.000đ</span>
        </p>
        <p className="flex justify-between mt-3 ">
          <span>Tổng cộng:</span>
          <span>2.000.000đ</span>
        </p>
      </div>
    </div>
  );
};

export default Summary;
