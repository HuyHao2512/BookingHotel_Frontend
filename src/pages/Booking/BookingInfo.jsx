import React, { useEffect, useState } from "react";
import { useBooking } from "../../contexts/BookingContext"; // Import context
import StepsComponent from "../../components/Booking/StepsComponent";
import BookingDetails from "../../components/Booking/BookingDetails";
import InfoProperties from "../../components/Booking/InfoProperties";
import InfoBooking from "../../components/Booking/InfoBooking";
import Tips from "../../components/Booking/Tips";
import { Row, Col, Button, Alert, message, Modal } from "antd";
import Summary from "../../components/Booking/Summary";
import { Footer } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import * as userServices from "../../services/user.service";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
function BookingInfo() {
  const [isValid, setIsValid] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { booking } = useBooking(); // Lấy dữ liệu booking từ context
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleValidation = (valid) => {
    setIsValid(valid);
  };
  const nextStep = () => {
    if (!isValid) {
      message.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setCurrentStep(2);
  };

  const preStep = () => {
    setCurrentStep(1);
  };

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

  const handleConfirm = () => {
    bookingMutation.mutate(booking); // Truyền dữ liệu booking vào đây
  };

  const handlePayPayment = async () => {
    const amount = booking.finalPrice; // Số tiền cần thanh toán
    const userId = booking.user; // ID người dùng
    const bankCode = "NCB";
    const orderInfo = `Thanh toán đặt phòng cho ${booking.propertyName}`;
    localStorage.setItem("pendingBooking", JSON.stringify(booking));
    try {
      const response = await axios.post(
        "http://localhost:3000/payment/vnpay/create", // URL backend của bạn
        {
          amount,
          userId,
          bankCode,
          orderInfo,
        }
      );

      console.log("Response from VNPay:", response);
      if (response.data.data?.paymentUrl) {
        window.location.href = response.data.data.paymentUrl;
      } else {
        message.error("Không thể tạo liên kết thanh toán.");
      }
    } catch (error) {
      console.error("Lỗi khi tạo thanh toán VNPay:", error);
      alert(error);
    }
  };

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("force-back");

    if (hasReloaded === "true") {
      sessionStorage.removeItem("force-back");
      history.back(); // 👈 tự động quay lại trang trước
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      sessionStorage.setItem("force-back", "true");
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      <div className="w-full px-6 pd-8">
        <div className="max-w-screen-xl mx-auto relative">
          <div className="max-w-5xl mx-auto py-8">
            <StepsComponent currentStep={currentStep} />
            <div>
              <Alert
                message="Bạn chưa bỏ lỡ điều gì cả!"
                type="info"
                className="mt-4"
              />
              <Row className="mt-8">
                <Col span={6}>
                  <InfoProperties
                    propertyName={booking.propertyName}
                    address={booking.propertyAddress}
                  />
                  <BookingDetails
                    checkIn={booking.checkIn || "Chưa chọn ngày"}
                    checkOut={booking.checkOut || "Chưa chọn ngày"}
                  />
                  <Tips />
                </Col>
                {currentStep === 1 && (
                  <Col span={18}>
                    <InfoBooking onValidate={handleValidation} />
                    <Summary booking={booking} />
                    <div className="mt-8 flex justify-end">
                      <Button className="mr-4" onClick={() => navigate(-1)}>
                        Quay lại
                      </Button>

                      <Button
                        type="primary"
                        onClick={() => {
                          nextStep();
                        }}
                      >
                        Đi đến bước cuối cùng
                      </Button>
                    </div>
                  </Col>
                )}

                {currentStep === 2 && (
                  <Col span={18}>
                    <div className="border p-4 w-full border-blue-200">
                      <h1 className="text-lg">XÁC NHẬN ĐẶT PHÒNG</h1>
                      <p className="text-gray-500">
                        Vui lòng kiểm tra thông tin đặt phòng của bạn trước khi
                        xác nhận.
                      </p>
                      <div>
                        <div className="mb-3">
                          <p>
                            <span className="font-bold">Tên khách hàng:</span>
                            &nbsp; {booking.name || "Chưa nhập"}
                          </p>
                        </div>
                        <div className="mb-3">
                          <p>
                            <span className="font-bold">Nơi lưu trú:</span>
                            &nbsp; {booking.propertyName || "Chưa chọn"}
                          </p>
                        </div>
                        <div className="mb-3">
                          <p>
                            <span className="font-bold">Địa chỉ:</span>
                            &nbsp; {booking.propertyAddress || "Chưa chọn"}
                          </p>
                        </div>
                        <div className="mb-3">
                          <p>
                            <span className="font-bold">Email khách hàng:</span>
                            &nbsp; {booking.email || "Chưa nhập"}
                          </p>
                        </div>
                        <div className="mb-3">
                          <p>
                            <span className="font-bold">Số điện thoại:</span>
                            &nbsp; {booking.phone || "Chưa nhập"}
                          </p>
                        </div>
                        <h3 className="text-xl">Thông tin phòng đã đặt</h3>
                        <div className="mb-4 mt-2 text-blue-500 text-md">
                          {booking.rooms.length > 0 ? (
                            booking.rooms.map((room, index) => (
                              <p key={index} className="text-lg">
                                {room.quantity} phòng {room.name}
                              </p>
                            ))
                          ) : (
                            <p>Chưa chọn phòng</p>
                          )}
                        </div>
                        <h3 className="text-xl">Thời gian lưu trú</h3>
                        <div className="mb-4 mt-2 text-blue-500 text-md">
                          <p className="text-lg">
                            Từ 14:00 {booking.checkIn || "Chưa chọn ngày"} đến
                            12:00 {booking.checkOut || "Chưa chọn ngày"}
                          </p>
                        </div>
                        <h3 className="text-xl">Tổng cộng</h3>
                        <p>
                          Phương thức thanh toán:&nbsp;
                          <span className="font-bold">
                            {booking.paymentMethod === 1
                              ? "Thanh toán khi nhận phòng"
                              : "Thanh toán online"}
                          </span>
                        </p>
                        <div className="mb-4 mt-2 text-blue-900 text-md text-lg">
                          <p>
                            Tổng tiền cần thanh toán: &nbsp;
                            <span className="font-bold">
                              {new Intl.NumberFormat("vi-VN").format(
                                booking.finalPrice
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-500 mt-3 ml-2">
                      Bằng cách nhấn xác nhận đặt phòng, bạn đã đồng ý với{" "}
                      <span
                        className="text-blue-600 cursor-pointer underline"
                        onClick={showModal}
                      >
                        chính sách đặt phòng
                      </span>{" "}
                      từ phía chúng tôi.
                    </p>
                    <div className="mt-8 flex justify-end">
                      <Button className="mr-4" onClick={preStep}>
                        Quay lại
                      </Button>
                      {booking.paymentMethod === 2 ? (
                        <Button
                          type="primary"
                          onClick={() => {
                            handlePayPayment();
                          }}
                        >
                          Thanh toán và đặt phòng
                        </Button>
                      ) : (
                        <Button type="primary" onClick={handleConfirm}>
                          Xác nhận đặt phòng
                        </Button>
                      )}
                    </div>
                    <Modal
                      title="Chính sách đặt phòng"
                      open={isModalVisible}
                      onCancel={handleCancel}
                      footer={null}
                    >
                      <p>- Không hoàn hủy sau khi đặt phòng.</p>
                      <p>- Nhận phòng từ 14:00, trả phòng trước 12:00.</p>
                      <p>- Giá đã bao gồm thuế và phí dịch vụ.</p>
                    </Modal>
                  </Col>
                )}
              </Row>
            </div>
          </div>
        </div>
      </div>
      <Footer className="text-center bg-blue-300 text-black fixed-b">
        © 2023 by Madella Hotel. Proudly created with Team 3
      </Footer>
    </div>
  );
}

export default BookingInfo;
