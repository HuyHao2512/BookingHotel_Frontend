import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Popover, Button, Avatar, List, message } from "antd";
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
    path: "/orders",
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
    navigate("/login");
  };

  // Hàm xử lý click để chuyển trang hoặc logout
  const handleMenuClick = (item) => {
    if (item.key === "logout") {
      handleLogout();
    } else {
      navigate(item.path);
    }
  };

  const content = (
    <StyledMenu>
      <List
        dataSource={menuItems}
        renderItem={(item) => (
          <List.Item>
            <StyledButton
              danger={item.danger}
              onClick={() => handleMenuClick(item)}
            >
              {item.icon} {item.label}
            </StyledButton>
          </List.Item>
        )}
      />
    </StyledMenu>
  );

  return (
    <StyledWrapper>
      <Popover content={content} trigger="click" placement="bottomRight">
        <StyledAccountButton>
          <StyledUserIcon />
          <span>Tài khoản</span>
        </StyledAccountButton>
      </Popover>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledAccountButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #ffffff;
  color: #007bff;
  font-weight: bold;
  border-radius: 8px;
  padding: 8px 16px;
  border: 2px solid #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #ffffff;
    color: #0056b3;
    transform: scale(1.05);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const StyledUserIcon = styled(UserOutlined)`
  font-size: 18px;
  color: #007bff;
`;

const StyledMenu = styled.div`
  min-width: 160px;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  background: none;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  color: ${({ danger }) => (danger ? "red" : "black")};

  &:hover {
    background: #f0f0f0;
  }
`;

export default ButtonAccount;
