import React, { useState } from "react";
import useTypeRoom from "../../hooks/useTypeRoom";
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

function ListTypeRoom() {
  const { data: typerooms, isLoading, error, refetch } = useTypeRoom();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [currentTypeRoom, setCurrentTypeRoom] = useState(null);
  const [form] = Form.useForm();

  const createMutation = useMutation({
    mutationFn: (data) => adminService.createTypeRoom(data),
    onSuccess: () => {
      setIsOpenCreate(false);
      message.success("Thêm loại phòng thành công");
      form.resetFields();
      refetch();
    },
    onError: (error) => {
      message.error(
        error?.response?.data?.message || "Thêm loại phòng thất bại"
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => adminService.updateTypeRoom(id, data),
    onSuccess: () => {
      setIsOpenEdit(false);
      setCurrentTypeRoom(null);
      message.success("Cập nhật loại phòng thành công");
      form.resetFields();
      refetch();
    },
    onError: (error) => {
      message.error(
        error?.response?.data?.message || "Cập nhật loại phòng thất bại"
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
      updateMutation.mutate({ id: currentTypeRoom._id, data: values });
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  const handleEdit = (record) => {
    setIsOpenEdit(true);
    setCurrentTypeRoom(record);
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
    { title: "Tên loại phòng", dataIndex: "name", key: "name" },
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
      <h2>Danh Sách Loại Phòng</h2>
      <Button
        type="primary"
        className="mb-4"
        onClick={() => setIsOpenCreate(true)}
      >
        + Thêm Loại Phòng
      </Button>
      <Table
        dataSource={typerooms || []}
        columns={columns}
        rowKey="_id" // Giả sử mỗi thành phố có `_id`
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title="Thêm Loại Phòng"
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
            label="Tên Loại Phòng"
            rules={[
              { required: true, message: "Vui lòng nhập tên loại phòng!" },
            ]}
          >
            <Input placeholder="Nhập tên loại phòng" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Sửa */}
      <Modal
        title="Sửa Loại Phòng"
        open={isOpenEdit}
        onCancel={() => {
          setIsOpenEdit(false);
          form.resetFields();
          setCurrentTypeRoom(null);
        }}
        onOk={handleUpdate}
        confirmLoading={updateMutation.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên Loại Phòng"
            rules={[
              { required: true, message: "Vui lòng nhập tên loại phòng!" },
            ]}
          >
            <Input placeholder="Nhập tên loại phòng" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ListTypeRoom;
