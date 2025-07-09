import {
  Card,
  Button,
  Row,
  Col,
  Spin,
  Empty,
  Space,
  message,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import useFindByOwner from "../../hooks/useFindByOwner";
import * as authService from "../../services/auth.service";
import { useMutation } from "@tanstack/react-query";
import {
  EnvironmentOutlined,
  PlusOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

// Styled components for custom styling
const StyledContainer = styled.div`
  padding: 32px;
  background: #f0f2f5;
  min-height: 100vh;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  .ant-card-head {
    background: #fafafa;
    border-bottom: 1px solid #e8e8e8;
  }

  .ant-card-body {
    padding: 16px;
  }
`;

const HotelImage = styled.div`
  width: 100%;
  height: 150px;
  background: #e8ecef;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 14px;
  background-image: ${({ imageUrl }) =>
    imageUrl
      ? `url(${imageUrl})`
      : `url("https://via.placeholder.com/300x150?text=Hotel+Image")`};
  background-size: cover;
  background-position: center;
`;

const StyledButton = styled(Button)`
  border-radius: 8px;
`;

const { Title, Text } = Typography;

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
      <StyledContainer>
        <div className="flex justify-center items-center min-h-[300px]">
          <Spin size="large" tip="Đang tải dữ liệu..." />
        </div>
      </StyledContainer>
    );
  }

  if (isError || !ownerData || !ownerData.data?.length) {
    return (
      <StyledContainer>
        <div className="flex justify-center items-center min-h-[300px]">
          <Empty description={<Text strong>Không có khách sạn nào</Text>}>
            <StyledButton type="primary" onClick={handleAddHotel}>
              <PlusOutlined /> Thêm khách sạn
            </StyledButton>
          </Empty>
        </div>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      {/* Thanh điều hướng */}
      <StyledHeader>
        <Title level={2} style={{ margin: 0, color: "#1a1a1a" }}>
          Danh sách khách sạn của bạn
        </Title>
        <Space>
          <StyledButton type="primary" onClick={handleAddHotel}>
            <PlusOutlined /> Thêm khách sạn
          </StyledButton>
          <StyledButton danger onClick={handleLogout}>
            <LogoutOutlined /> Đăng xuất
          </StyledButton>
        </Space>
      </StyledHeader>

      {/* Danh sách khách sạn */}
      <Row gutter={[24, 24]}>
        {ownerData.data.map((hotel) => (
          <Col key={hotel._id} xs={24} sm={12} md={8} lg={6}>
            <StyledCard
              title={hotel.name}
              bordered={false}
              hoverable
              extra={
                <StyledButton
                  type="primary"
                  onClick={() => handleManage(hotel._id)}
                >
                  Quản lý
                </StyledButton>
              }
            >
              <HotelImage
                imageUrl={
                  hotel.images && hotel.images.length > 0
                    ? hotel.images[0].url
                    : null
                }
              />
              <Text>
                <EnvironmentOutlined /> {hotel.address}
              </Text>
            </StyledCard>
          </Col>
        ))}
      </Row>
    </StyledContainer>
  );
}

export default ManagerPage;
