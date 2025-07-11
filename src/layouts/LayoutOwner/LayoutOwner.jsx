import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AreaChartOutlined,
  DatabaseOutlined,
  PicLeftOutlined,
  LogoutOutlined,
  FileTextOutlined,
  AlignLeftOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, message } from "antd";
import {
  BrowserRouter as Router,
  useNavigate,
  Outlet,
  useParams,
} from "react-router-dom";
import * as authService from "../../services/auth.service";
import { useMutation } from "@tanstack/react-query";
const { Header, Sider, Content } = Layout;

function LayoutOwner() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      handleLogout();
    } else {
      navigate(e.key);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="flex items-center justify-center h-16">
          <h1>Quản lý</h1>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          items={[
            {
              key: `/owner/${id}/information`,
              icon: <InfoCircleOutlined />,
              label: "Thông tin nơi lưu trú",
            },
            {
              key: `/owner/${id}/dashboard`,
              icon: <DatabaseOutlined />,
              label: "Thống kê",
            },
            {
              key: `/owner/${id}/rooms`,
              icon: <PicLeftOutlined />,
              label: "Danh mục phòng",
            },
            {
              key: `/owner/${id}/booking`,
              icon: <FileTextOutlined />,
              label: "Đơn đặt phòng",
            },
            {
              key: `/owner/${id}/discount`,
              icon: <AreaChartOutlined />,
              label: "Khuyến mãi",
            },
            {
              key: "/mananger",
              icon: <AlignLeftOutlined />,
              label: "Quản lý khách sạn",
            },
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Đăng xuất",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            padding: "20px",
            backgroundColor: "white",
          }}
        >
          {location.pathname === "/admin" ? (
            <div>
              <h1>Chào mừng bạn đến với trang quản trị</h1>
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutOwner;
