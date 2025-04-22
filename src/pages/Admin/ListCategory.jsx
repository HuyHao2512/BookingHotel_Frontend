import React from "react";
import useCategory from "../../hooks/useCategory"; // Giả sử bạn đã tạo hook này
import { Table, Spin, Alert, Button, Space } from "antd";

function ListCategory() {
  const { data: categories, isLoading, error } = useCategory();

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
    { title: "Tên loại hình lưu trú", dataIndex: "name", key: "name" },
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
      <Button type="primary" className="mb-4">
        + Thêm Phòng
      </Button>
      <h2>Danh Sách loại Hình Lưu Trú</h2>
      <Table
        dataSource={categories || []}
        columns={columns}
        rowKey="_id" // Giả sử mỗi thành phố có `_id`
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default ListCategory;
