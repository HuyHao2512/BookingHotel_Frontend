import { useState } from "react";
import { Input, Button, Card } from "antd";

const PaymentPage = () => {
  const [paymentInfo, setPaymentInfo] = useState({
    name: "",
    email: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handlePayment = () => {
    console.log("Processing payment with: ", paymentInfo);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="p-6 shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-4">
          Thanh toán qua QR
        </h2>
        <img
          src="/path-to-your-qr-code.png"
          alt="QR Code"
          className="w-full mb-4 rounded-lg"
        />
        <Input
          name="name"
          placeholder="Họ và tên"
          value={paymentInfo.name}
          onChange={handleChange}
          className="mb-2"
        />
        <Input
          name="email"
          placeholder="Email"
          value={paymentInfo.email}
          onChange={handleChange}
          className="mb-2"
        />
        <Input
          name="amount"
          placeholder="Số tiền (VNĐ)"
          type="number"
          value={paymentInfo.amount}
          onChange={handleChange}
          className="mb-4"
        />
        <Button type="primary" className="w-full" onClick={handlePayment}>
          Xác nhận thanh toán
        </Button>
      </Card>
    </div>
  );
};

export default PaymentPage;
