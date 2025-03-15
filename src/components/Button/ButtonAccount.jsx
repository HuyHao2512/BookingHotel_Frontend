import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Popover, List, message } from "antd";
import * as authService from "../../services/auth.service";
import {
  UserOutlined,
  LogoutOutlined,
  HeartOutlined,
  LockOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
const menuItems = [
  {
    key: "orders",
    label: "Đơn đặt phòng",
    icon: <DatabaseOutlined />,
    path: `/booking-history/${localStorage.getItem("userId")}`,
  },
  {
    key: "wishlist",
    label: "Yêu thích",
    icon: <HeartOutlined />,
    path: "/like",
  },
  {
    key: "change-password",
    label: "Đổi mật khẩu",
    icon: <LockOutlined />,
    path: "/change-password",
  },
  { key: "logout", label: "Đăng xuất", icon: <LogoutOutlined />, danger: true },
];

const ButtonAccount = () => {
  const navigate = useNavigate();
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
    onError: (error) => {
      message.error("Đăng xuất thất bại!");
      console.log("Error:", error);
    },
  });
  const handleLogout = () => {
    logoutMutation.mutate({
      refreshToken: localStorage.getItem("refreshToken"),
    });
  };

  const handleMenuClick = (item) => {
    if (item.key === "logout") {
      handleLogout();
    } else {
      navigate(item.path);
    }
  };

  const content = (
    <List
      dataSource={menuItems}
      renderItem={(item) => (
        <List.Item style={{ padding: 0 }}>
          <StyledMenuButton
            danger={item.danger}
            onClick={() => handleMenuClick(item)}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </StyledMenuButton>
        </List.Item>
      )}
    />
  );

  return (
    <StyledWrapper>
      <Popover content={content} trigger="click" placement="bottomRight">
        <StyledAccountButton>
          <StyledUserIcon />
          <span className="label">Tài khoản</span>
        </StyledAccountButton>
      </Popover>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledAccountButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border: 2px solid #2563eb;

  &:hover {
    background: linear-gradient(135deg, #1e40af, #60a5fa);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    border-color: #93c5fd;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  .label {
    letter-spacing: 0.5px;
  }
`;

const StyledUserIcon = styled(UserOutlined)`
  font-size: 20px;
  color: #ffffff;
`;

const StyledMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  background: transparent;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: ${({ danger }) => (danger ? "#ef4444" : "#1f2937")};
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #f3f4f6, #e5e7eb);
    color: ${({ danger }) => (danger ? "#dc2626" : "#1e40af")};
  }

  .icon {
    font-size: 18px;
    color: ${({ danger }) => (danger ? "#ef4444" : "#6b7280")};
  }

  .label {
    flex: 1;
    text-align: left;
    letter-spacing: 0.5px;
  }

  &:hover .icon {
    color: ${({ danger }) => (danger ? "#dc2626" : "#1e40af")};
  }
`;

export default ButtonAccount;
