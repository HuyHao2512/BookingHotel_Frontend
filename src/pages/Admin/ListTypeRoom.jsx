import React from "react";
import useTypeRoom from "../../hooks/useTypeRoom";
import { Table, Spin, Alert, Button, Space } from "antd";

function ListTypeRoom() {
  const { data: typerooms, isLoading, error } = useTypeRoom();

  if (isLoading) return <Spin size="large" />;
  if (error)
    return (
      <Alert
        message="Lỗi khi tải danh sách thành phố"
        description={error.message}
        type="error"
      />
    );

  // Cấu hình cột của bảng
  const columns = [
    { title: "Tên loại phòng", dataIndex: "name", key: "name" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary">Sửa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Danh Sách Loại Phòng</h2>
      <Button type="primary" className="mb-4">
        + Thêm Phòng
      </Button>
      <Table
        dataSource={typerooms || []}
        columns={columns}
        rowKey="_id" // Giả sử mỗi thành phố có `_id`
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default ListTypeRoom;
