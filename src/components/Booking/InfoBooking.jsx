import { Input, Radio, Popover } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

const InfoBooking = () => {
  const [paymentMethod, setPaymentMethod] = useState(1); // Thanh toán khi nhận phòng
  const [onlinePaymentMethod, setOnlinePaymentMethod] = useState(null); // Phương thức online

  return (
    <div className="bg-white border border-blue-200 p-4">
      <h3 className="text-lg font-semibold mb-4">
        Nhập thông tin chi tiết của bạn
      </h3>

      {/* Họ tên */}
      <div className="mb-4 flex items-center">
        <label className="w-28 font-medium">Họ tên:</label>
        <Input
          placeholder="Nhập họ của bạn"
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Email có Popover */}
      <div className="mb-4 flex items-center">
        <label className="w-28 font-medium">Email:</label>
        <Input
          className="border p-2 rounded w-full"
          placeholder="abc@gmail.com"
          suffix={
            <Popover content="Đơn đặt phòng sẽ gửi về email của bạn">
              <InfoCircleOutlined className="text-gray-500 cursor-pointer" />
            </Popover>
          }
        />
      </div>

      {/* Số điện thoại */}
      <div className="mb-4 flex items-center">
        <label className="w-28 font-medium">Số điện thoại:</label>
        <Input
          placeholder="Nhập số điện thoại của bạn"
          className="border p-2 rounded w-full"
          suffix={
            <Popover content="Cần thiết để chỗ nghỉ liên lạc với bạn">
              <InfoCircleOutlined className="text-gray-500 cursor-pointer" />
            </Popover>
          }
        />
      </div>

      {/* Ghi chú */}
      <div className="mb-4 flex items-center">
        <label className="w-28 font-medium">Ghi chú:</label>
        <Input.TextArea
          placeholder="Nhập yêu cầu đặc biệt của bạn"
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Mã giảm giá */}
      <div className="mb-4 flex items-center">
        <label className="w-28 font-medium">Mã giảm giá:</label>
        <Input
          placeholder="Nhập mã giảm giá của bạn (nếu có)"
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Hình thức thanh toán */}
      <div className="mb-4 flex items-center">
        <label className="w-40 font-medium">Hình thức thanh toán:</label>
        <Radio.Group
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <Radio value={1}>Thanh toán khi nhận phòng</Radio>
          <Radio value={2}>Thanh toán trước</Radio>
        </Radio.Group>
      </div>
      {paymentMethod === 2 && (
        <div className="ml-40 border rounded p-3 bg-gray-50">
          <h3 className="font-semibold mb-2">Chọn phương thức thanh toán:</h3>
          <Radio.Group
            value={onlinePaymentMethod}
            onChange={(e) => setOnlinePaymentMethod(e.target.value)}
          >
            <div className="space-y-2">
              <Radio value="credit_card">Thẻ tín dụng / Ghi nợ</Radio> <br />
              <Radio value="momo">Momo</Radio> <br />
              <Radio value="zalopay">ZaloPay</Radio> <br />
              <Radio value="bank_transfer">Chuyển khoản ngân hàng</Radio>
            </div>
          </Radio.Group>
        </div>
      )}
    </div>
  );
};

export default InfoBooking;
