// src/components/PaymentResult.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentResult = () => {
  const location = useLocation();
  const [status, setStatus] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const vnp_ResponseCode = query.get("vnp_ResponseCode");

    if (vnp_ResponseCode === "00") {
      setStatus("Thanh toán thành công!");
    } else {
      setStatus("Thanh toán thất bại.");
    }
  }, [location]);

  return (
    <div>
      <h2>Kết Quả Thanh Toán</h2>
      <p>{status}</p>
    </div>
  );
};

export default PaymentResult;
