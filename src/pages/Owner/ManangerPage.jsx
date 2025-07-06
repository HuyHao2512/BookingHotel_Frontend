import { Card, Button, Row, Col, Spin, Empty, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import useFindByOwner from "../../hooks/useFindByOwner";
import * as authService from "../../services/auth.service"; // thêm nếu cần
import { useMutation } from "@tanstack/react-query";

function ManagerPage() {
  const navigate = useNavigate();

  const { data: ownerData, isLoading, isError } = useFindByOwner();

  const logoutMutation = useMutation({
    mutationFn: (data) => authService.logout(data),
    onSuccess: () => {
      message.success("Đăng xuất thành công!");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      navigate("/login");
    },
    onError: () => {
      message.error("Đăng xuất thất bại!");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate({
      refreshToken: localStorage.getItem("refreshToken"),
    });
  };

  const handleManage = (hotelId) => {
    navigate(`/owner/${hotelId}/information`);
  };

  const handleAddHotel = () => {
    navigate("/signup");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !ownerData || !ownerData.data?.length) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Empty description="Không có khách sạn nào" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      {/* Thanh điều hướng */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h1 style={{ fontSize: 24 }}>Danh sách khách sạn của bạn</h1>
        <Space>
          <Button type="primary" onClick={handleAddHotel}>
            ➕ Thêm khách sạn
          </Button>
          <Button danger onClick={handleLogout}>
            🚪 Đăng xuất
          </Button>
        </Space>
      </div>

      {/* Danh sách khách sạn */}
      <Row gutter={[16, 16]}>
        {ownerData.data.map((hotel) => (
          <Col key={hotel._id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={hotel.name}
              bordered
              hoverable
              extra={
                <Button type="primary" onClick={() => handleManage(hotel._id)}>
                  Quản lý
                </Button>
              }
            >
              <p>Địa chỉ: {hotel.address}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ManagerPage;
