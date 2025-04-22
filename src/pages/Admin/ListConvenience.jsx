import React from "react";
import useConveniences from "../../hooks/useConveniences"; // Giả sử bạn đã tạo hook này
import { Table, Spin, Alert, Button, Space } from "antd";

function ListConveniece() {
  const { data: conveniences, isLoading, error } = useConveniences();

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
    { title: "Tên tiện nghi", dataIndex: "name", key: "name" },
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
      <h2>Danh Sách Tiện Nghi</h2>
      <Button type="primary" className="mb-4">
        + Thêm Phòng
      </Button>
      <Table
        dataSource={conveniences || []}
        columns={columns}
        rowKey="_id" // Giả sử mỗi thành phố có `_id`
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default ListConveniece;
