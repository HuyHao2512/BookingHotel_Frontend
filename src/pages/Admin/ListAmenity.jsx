import React, { useState } from "react";
import useAmenities from "../../hooks/useAmenities";
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

function ListAmenity() {
  const { data: amenities, isLoading, error, refetch } = useAmenities();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [currentAmenity, setCurrentAmenity] = useState(null);
  const [form] = Form.useForm();

  const createMutation = useMutation({
    mutationFn: (data) => adminService.createAmenity(data),
    onSuccess: () => {
      setIsOpenCreate(false);
      message.success("Thêm tiện ích thành công");
      form.resetFields();
      refetch();
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || "Thêm tiện ích thất bại");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => adminService.updateAmenity(id, data),
    onSuccess: () => {
      setIsOpenEdit(false);
      setCurrentAmenity(null);
      message.success("Cập nhật tiện ích thành công");
      form.resetFields();
      refetch();
    },
    onError: (error) => {
      message.error(
        error?.response?.data?.message || "Cập nhật tiện ích thất bại"
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
      updateMutation.mutate({ id: currentAmenity._id, data: values });
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  const handleEdit = (record) => {
    setIsOpenEdit(true);
    setCurrentAmenity(record);
    form.setFieldsValue({ name: record.name });
  };

  const columns = [
    { title: "Tên tiện ích", dataIndex: "name", key: "name" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
        </Space>
      ),
    },
  ];

  if (isLoading) return <Spin size="large" />;
  if (error)
    return (
      <Alert
        message="Lỗi khi tải danh sách tiện ích"
        description={error.message}
        type="error"
      />
    );

  return (
    <div>
      <h2>Danh Sách Tiện Ích</h2>
      <Button
        type="primary"
        className="mb-4"
        onClick={() => setIsOpenCreate(true)}
      >
        + Thêm Tiện Ích
      </Button>

      <Table
        dataSource={amenities || []}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      {/* Modal Thêm */}
      <Modal
        title="Thêm Tiện Ích"
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
            label="Tên Tiện Ích"
            rules={[{ required: true, message: "Vui lòng nhập tên tiện ích!" }]}
          >
            <Input placeholder="Nhập tên tiện ích" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Sửa */}
      <Modal
        title="Sửa Tiện Ích"
        open={isOpenEdit}
        onCancel={() => {
          setIsOpenEdit(false);
          form.resetFields();
          setCurrentAmenity(null);
        }}
        onOk={handleUpdate}
        confirmLoading={updateMutation.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên Tiện Ích"
            rules={[{ required: true, message: "Vui lòng nhập tên tiện ích!" }]}
          >
            <Input placeholder="Nhập tên tiện ích" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ListAmenity;
