import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AreaChartOutlined,
  DatabaseOutlined,
  PicLeftOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { BrowserRouter as Router, useNavigate, Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;

function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      handleLogout();
    } else {
      navigate(e.key);
    }
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="flex items-center justify-center h-16">
          <h1>Quản lý</h1>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["/admin"]}
          onClick={handleMenuClick}
          items={[
            {
              key: "/admin/dashboard",
              icon: <DatabaseOutlined />,
              label: " Trang quản lý",
            },
            {
              key: "/admin/users",
              icon: <PicLeftOutlined />,
              label: "Danh mục phòng",
            },
            {
              key: "/admin/booking",
              icon: <AreaChartOutlined />,
              label: "Đơn hàng",
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

export default LayoutAdmin;
