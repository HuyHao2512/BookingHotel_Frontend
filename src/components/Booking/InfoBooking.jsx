import { Input, Radio, Popover } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useBooking } from "../../contexts/BookingContext";

const InfoBooking = ({ onValidate }) => {
  const { updateBooking } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState(1); // Thanh toán khi nhận phòng
  const [onlinePaymentMethod, setOnlinePaymentMethod] = useState(null); // Phương thức online
  const [name, setName] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [errors, setErrors] = useState({}); // State lưu lỗi

  useEffect(() => {
    updateBooking({
      name,
      email,
      phone,
      description,
      discount,
      paymentMethod,
      onlinePaymentMethod,
    });
  }, [
    name,
    email,
    phone,
    description,
    discount,
    paymentMethod,
    onlinePaymentMethod,
  ]);

  const validateFields = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(0[1-9][0-9]{8,9})$/; // Hỗ trợ số điện thoại Việt Nam

    if (!name.trim()) newErrors.name = "Họ tên không được để trống!";
    if (!email.trim()) {
      newErrors.email = "Email không được để trống!";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email không đúng định dạng!";
    }
    if (!phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống!";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ!";
    }
    if (paymentMethod === 2 && !onlinePaymentMethod) {
      newErrors.onlinePaymentMethod = "Vui lòng chọn phương thức thanh toán!";
    }

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    onValidate(isValid); // Gửi kết quả validate lên component cha
    return isValid;
  };

  useEffect(() => {
    validateFields(); // Kiểm tra lỗi khi user nhập dữ liệu
  }, [name, email, phone, paymentMethod, onlinePaymentMethod]);

  return (
    <div className="bg-white border border-blue-200 p-4">
      <h3 className="text-lg font-semibold mb-4">
        Nhập thông tin chi tiết của bạn
      </h3>

      {/* Họ tên */}
      <div className="mb-4">
        <div className="flex items-center">
          <label className="w-28 font-medium">Họ tên:</label>
          <div className="flex-1">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập họ của bạn"
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm mt-1 ml-28">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <div className="flex items-center">
          <label className="w-28 font-medium">Email:</label>
          <div className="flex-1">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập emai của bạn"
              className="border p-2 rounded w-full"
              suffix={
                <Popover content="Đơn đặt phòng sẽ gửi về email của bạn">
                  <InfoCircleOutlined className="text-gray-500 cursor-pointer" />
                </Popover>
              }
            />
          </div>
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1 ml-28">{errors.email}</p>
        )}
      </div>

      {/* Số điện thoại */}
      <div className="mb-4">
        <div className="flex items-center">
          <label className="w-28 font-medium">Số điện thoại:</label>
          <div className="flex-1">
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại của bạn"
              className="border p-2 rounded w-full"
              suffix={
                <Popover content="Chúng tôi sẽ liên hệ với bạn qua số điện thoại này">
                  <InfoCircleOutlined className="text-gray-500 cursor-pointer" />
                </Popover>
              }
            />
          </div>
        </div>
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1 ml-28">{errors.phone}</p>
        )}
      </div>

      {/* Ghi chú */}
      {/* Ghi chú */}
      <div className="mb-4">
        <div className="flex items-start">
          {" "}
          {/* Đổi items-center thành items-start */}
          <label className="w-28 font-medium mt-2">Ghi chú:</label>{" "}
          {/* Thêm mt-2 để label căn giữa với input */}
          <div className="flex-1">
            <Input.TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập yêu cầu đặc biệt của bạn"
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center">
          <label className="w-28 font-medium">Mã giảm giá:</label>
          <div className="flex-1">
            <Input
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Nhập mã giảm giá của bạn (nếu có)"
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
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
              <Radio value="credit_card">VN PAY</Radio> <br />
              <Radio value="momo">Momo</Radio> <br />
              <Radio value="zalopay">ZaloPay</Radio> <br />
              <Radio value="bank_transfer">Chuyển khoản ngân hàng</Radio>
            </div>
          </Radio.Group>
        </div>
      )}

      {errors.onlinePaymentMethod && (
        <p className="text-red-500 text-sm">{errors.onlinePaymentMethod}</p>
      )}
    </div>
  );
};

export default InfoBooking;
