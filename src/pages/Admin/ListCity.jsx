import React from "react";
import useCity from "../../hooks/useCity";
import { Table, Spin, Alert, Button, Space } from "antd";

function ListCity() {
  const { data: cities, isLoading, error } = useCity();

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
    { title: "Tên Thành Phố", dataIndex: "name", key: "name" },
    { title: "Quốc gia", dataIndex: "country", key: "cpuntry" },
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
      <h2>Danh Sách Thành Phố</h2>
      <Table
        dataSource={cities || []}
        columns={columns}
        rowKey="_id" // Giả sử mỗi thành phố có `_id`
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default ListCity;
