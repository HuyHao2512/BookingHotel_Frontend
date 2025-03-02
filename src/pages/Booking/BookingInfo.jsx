import React, { useState } from "react";
import StepsComponent from "../../components/Booking/StepsComponent";
import BookingDetails from "../../components/Booking/BookingDetails";
import InfoProperties from "../../components/Booking/InfoProperties";
import InfoBooking from "../../components/Booking/InfoBooking";
import Tips from "../../components/Booking/Tips";
import { Row, Col, Button, Alert, message, Modal } from "antd";
import Summary from "../../components/Booking/Summary";
import { Footer } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";

function BookingInfo() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const nextStep = () => {
    setCurrentStep(2); // Cập nhật bước thành 2
  };
  const preStep = () => {
    setCurrentStep(1); // Cập nhật bước thành 1
  };
  const navigateToHome = () => {
    navigate(-1);
  };
  const handleConfirm = () => {
    console.log("Confirm");
    message.success("Đặt phòng thành công, vui lòng kiểm tra email của bạn!");
  };
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
                    name="Madella Hotel"
                    location="48 Ngo Quyen, Cần Thơ, Việt Nam"
                  />
                  <BookingDetails
                    checkIn="Thứ 6, 14 tháng 3, 2025 từ 14:00"
                    checkOut="Thứ 7, 15 tháng 3, 2025 đến 12:00"
                    roomType="Phòng Superior Giường Đôi"
                    price="425.541"
                  />
                  <Tips />
                </Col>{" "}
                {currentStep === 1 && (
                  <Col span={18}>
                    <InfoBooking />
                    <Summary />
                    <div className="mt-8 flex justify-end">
                      <Button
                        className="mr-4"
                        color="purple"
                        variant="filled"
                        onClick={() => navigate(-1)}
                      >
                        Quay lại
                      </Button>
                      <Button type="primary" onClick={nextStep}>
                        Đi đến bước cuối cùng
                      </Button>
                    </div>
                  </Col>
                )}
                {currentStep === 2 && (
                  <Col span={18}>
                    <div className="border p-4 w-full border-blue-20 border-blue-200">
                      <h1 className="text-lg">XÁC NHẬN ĐẶT PHÒNG</h1>
                      <p className="text-gray-500">
                        Vui lòng kiểm tra thông tin đặt phòng của bạn trước khi
                        xác nhận.
                      </p>
                      <div>
                        <div className="mb-3 flex items-center">
                          <p>
                            <span className="font-bold">Tên khách hàng:</span>
                            &nbsp; Nguyễn Văn A
                          </p>
                        </div>
                        <div className="mb-3 flex items-center">
                          <p>
                            <span className="font-bold">Nơi lưu trú:</span>
                            &nbsp; Khách sạn ABC
                          </p>
                        </div>
                        <div className="mb-3 flex items-center">
                          <p>
                            <span className="font-bold">Email khách hàng:</span>
                            &nbsp; abc@gmail.com
                          </p>
                        </div>
                        <div className="mb-3 flex items-center">
                          <p>
                            <span className="font-bold">Số điện thoại:</span>
                            &nbsp; 0125487456
                          </p>
                        </div>
                        <h3 className="text-xl">Thông tin phòng đã đặt</h3>
                        <div className="mb-4 mt-2 text-blue-500 text-md">
                          <p>
                            <span>1 phòng đơn tiêu chuẩn</span>
                          </p>
                          <p>
                            <span>2 phòng đơn tiêu chuẩn</span>
                          </p>
                        </div>
                        <h3 className="text-xl">Thời gian lưu trú</h3>
                        <div className="mb-4 mt-2 text-blue-500 text-md">
                          <p>
                            <span>Thứ 6, 14 tháng 3, 2025 từ 14:00</span>
                          </p>
                          <p>
                            <span>Thứ 7, 15 tháng 3, 2025 đến 12:00</span>
                          </p>
                        </div>
                        <h3 className="text-xl">Tổng cộng</h3>
                        <p>
                          Phương thức thanh toán:&nbsp;
                          <span className="font-bold">
                            Thanh toán khi nhận phòng
                          </span>
                        </p>
                        <div className="mb-4 mt-2 text-blue-900 text-md">
                          <p>
                            Tổng tiền cần thanh toán: &nbsp;
                            <span>425.541 VND</span>
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
                      <Button
                        className="mr-4"
                        color="purple"
                        variant="filled"
                        onClick={preStep}
                      >
                        Quay lại
                      </Button>
                      <Button type="primary" onClick={handleConfirm}>
                        Xác nhận đặt phòng
                      </Button>
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
