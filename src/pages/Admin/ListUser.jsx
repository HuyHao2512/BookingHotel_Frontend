import React, { useState, useMemo } from "react";
import * as adminService from "../../services/admin.service";
import { useQuery } from "@tanstack/react-query";
import { Table, Spin, Alert, Select, Space } from "antd";
import { format } from "date-fns";

const ListUser = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: adminService.getAllUser,
  });

  const [selectedRole, setSelectedRole] = useState("all");

  // Danh sách người dùng
  const users = data?.data || [];

  // Lọc theo vai trò
  const filteredUsers = useMemo(() => {
    if (selectedRole === "all") return users;
    return users.filter((user) => user.roles.includes(selectedRole));
  }, [users, selectedRole]);

  // Danh sách vai trò duy nhất
  const allRoles = useMemo(() => {
    const roleSet = new Set();
    users.forEach((u) => u.roles.forEach((r) => roleSet.add(r)));
    return Array.from(roleSet);
  }, [users]);

  if (isLoading) return <Spin size="large" />;
  if (isError)
    return (
      <Alert
        message="Lỗi khi tải danh sách user"
        description={error.message}
        type="error"
      />
    );

  const columns = [
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Vai trò",
      dataIndex: "roles",
      key: "roles",
      render: (roles) => roles.join(", "),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => format(new Date(date), "dd/MM/yyyy HH:mm:ss"),
    },
  ];

  return (
    <div>
      <h2>Danh sách người dùng</h2>

      <Space style={{ marginBottom: 16 }}>
        <span>Lọc theo vai trò:</span>
        <Select
          value={selectedRole}
          onChange={(value) => setSelectedRole(value)}
          style={{ width: 200 }}
        >
          <Select.Option value="all">Tất cả</Select.Option>
          {allRoles.map((role) => (
            <Select.Option key={role} value={role}>
              {role}
            </Select.Option>
          ))}
        </Select>
      </Space>

      <Table
        dataSource={filteredUsers}
        rowKey="_id"
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ListUser;
