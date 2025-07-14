import React, { useState } from "react";
import useConveniences from "../../hooks/useConveniences"; // Giả sử bạn đã tạo hook này
import {
  Table,
  Spin,
  Alert,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import * as adminService from "../../services/admin.service";
import { useMutation } from "@tanstack/react-query";
function ListConveniece() {
  const { data: conveniences, isLoading, error, refetch } = useConveniences();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [currentConvenience, setCurrentConvenience] = useState(null);
  const [form] = Form.useForm();
  const createMutation = useMutation({
    mutationFn: (data) => adminService.createConvience(data),
    onSuccess: () => {
      setIsOpenCreate(false);
      message.success("Thêm tiện nghi thành công");
      form.resetFields();
      refetch();
    },
    onError: (error) => {
      message.error(
        error?.response?.data?.message || "Thêm tiện nghi thất bại"
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => adminService.updateConvience(id, data),
    onSuccess: () => {
      setIsOpenEdit(false);
      setCurrentConvenience(null);
      message.success("Cập nhật tiện nghi thành công");
      form.resetFields();
      refetch();
    },
    onError: (error) => {
      message.error(
        error?.response?.data?.message || "Cập nhật tiện nghi thất bại"
      );
    },
  });
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      createMutation.mutate(values);
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      updateMutation.mutate({ id: currentConvenience._id, data: values });
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };
  const handleEdit = (record) => {
    setIsOpenEdit(true);
    setCurrentConvenience(record);
    form.setFieldsValue({ name: record.name });
  };

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
          <Button type="primary" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Danh Sách Tiện Nghi</h2>
      <Button
        type="primary"
        className="mb-4"
        onClick={() => setIsOpenCreate(true)}
      >
        + Thêm Tiện Nghi
      </Button>
      <Table
        dataSource={conveniences || []}
        columns={columns}
        rowKey="_id" // Giả sử mỗi thành phố có `_id`
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title="Thêm Tiện Nghi"
        open={isOpenCreate}
        onCancel={() => {
          setIsOpenCreate(false);
          form.resetFields();
        }}
        onOk={handleSubmit}
        confirmLoading={createMutation.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên Tiện Nghi"
            rules={[
              { required: true, message: "Vui lòng nhập tên tiện nghi!" },
            ]}
          >
            <Input placeholder="Nhập tên tiện nghi" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Sửa */}
      <Modal
        title="Sửa Tiện Nghi"
        open={isOpenEdit}
        onCancel={() => {
          setIsOpenEdit(false);
          form.resetFields();
          setCurrentConvenience(null);
        }}
        onOk={handleUpdate}
        confirmLoading={updateMutation.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên Tiện Nghi"
            rules={[
              { required: true, message: "Vui lòng nhập tên tiện nghi!" },
            ]}
          >
            <Input placeholder="Nhập tên tiện nghi" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ListConveniece;
