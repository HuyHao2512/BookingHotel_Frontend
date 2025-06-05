import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import * as userServices from "../../services/user.service";

function PaymentSuccess() {
  const navigate = useNavigate();
  const booking = JSON.parse(localStorage.getItem("pendingBooking"));

  const bookingMutation = useMutation({
    mutationFn: (booking) => userServices.bookingRoom(booking),
    onSuccess: (data) => {
      console.log("Đặt phòng thành công", data);
      message.success("Đặt phòng thành công, vui lòng kiểm tra email của bạn!");
      window.location.href = "/";
    },
    onError: (error) => {
      console.log("Đặt phòng thất bại", error);
      message.error("Đặt phòng thất bại, vui lòng thử lại sau!");
    },
  });

  const handleGoHome = () => {
    navigate("/");
    bookingMutation.mutate(booking);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: "64px" }} />
      <h1 style={{ marginTop: "16px" }}>Thanh toán thành công!</h1>
      <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
      <Button
        type="primary"
        size="large"
        onClick={handleGoHome}
        style={{ marginTop: "24px" }}
      >
        Quay về trang chủ
      </Button>
    </div>
  );
}

export default PaymentSuccess;
