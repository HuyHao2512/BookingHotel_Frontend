import React from "react";
import * as adminService from "../../services/admin.service";
import { useQuery } from "@tanstack/react-query";
import { Table, Spin, Alert } from "antd";
import { format } from "date-fns";

const ListUser = () => {
  // Fetch danh sách user
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: adminService.getAllUser,
  });

  if (isLoading) return <Spin size="large" />;
  if (isError)
    return (
      <Alert
        message="Lỗi khi tải danh sách user"
        description={error.message}
        type="error"
      />
    );

  // Cấu hình cột cho bảng
  const columns = [
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Vai trò",
      dataIndex: "roles",
      key: "roles",
      render: (roles) => roles.join(", "), // Hiển thị danh sách roles
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => format(new Date(date), "dd/MM/yyyy HH:mm:ss"), // Format ngày
    },
  ];
  console.log(data);
  return (
    <div>
      <h2>Danh sách người dùng</h2>
      <Table
        dataSource={data.data || []}
        rowKey="_id"
        columns={columns}
        pagination={{ pageSize: 10 }} // Phân trang 5 user mỗi trang
      />
    </div>
  );
};

export default ListUser;
