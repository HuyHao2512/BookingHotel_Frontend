import { useState } from "react";
import useCity from "../../hooks/useCity";
import {
  Table,
  Spin,
  Alert,
  Button,
  Space,
  message,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Image,
} from "antd";
import { useMutation } from "@tanstack/react-query";
import * as adminService from "../../services/admin.service";
import { UploadOutlined } from "@ant-design/icons";
import useBanner from "../../hooks/useBanner";

function DashboardAdmin() {
  const { data: banners, isLoading, error, refetch } = useBanner();
  const [isOpenModal, setIsModalOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [form] = Form.useForm();

  const createMutation = useMutation({
    mutationFn: (data) => adminService.createBanner(data),
    onSuccess: () => {
      setIsModalOpen(false);
      form.resetFields();
      message.success("Thêm banner thành công");
      refetch();
    },
    onError: (error) => {
      console.error("Error adding banner:", error);
      message.error(error?.response?.data?.message || "Thêm banner thất bại");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => adminService.updateBanner(id, data),
    onSuccess: () => {
      setIsOpenEdit(false);
      form.resetFields();
      setCurrentBanner(null);
      message.success("Cập nhật banner thành công");
      refetch();
    },
    onError: (error) => {
      console.error("Error updating banner:", error);
      message.error(
        error?.response?.data?.message || "Cập nhật banner thất bại"
      );
    },
  });

  if (isLoading) return <Spin size="large" />;
  if (error) return <p>Có lỗi</p>;

  const columns = [
    { title: "Tên chiến dịch", dataIndex: "title", key: "title" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image src={image?.url} alt="Banner" style={{ width: 200 }} />
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button
            color="danger"
            variant="solid"
            onClick={() => {
              Modal.confirm({
                title: "Xóa Banner",
                content: "Bạn có chắc chắn muốn xóa banner này?",
                onOk: () => {
                  adminService
                    .removeBanner(record._id)
                    .then(() => {
                      message.success("Xóa banner thành công");
                      refetch();
                    })
                    .catch((error) => {
                      message.error(
                        error?.response?.data?.message || "Xóa banner thất bại"
                      );
                    });
                },
              });
            }}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);

      if (!values.file || values.file.length === 0) {
        message.error("Vui lòng chọn ảnh");
        return;
      }
      formData.append("file", values.file[0].originFileObj);

      createMutation.mutate(formData);
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);

      if (values.file && values.file[0]?.originFileObj) {
        formData.append("file", values.file[0].originFileObj);
      }

      updateMutation.mutate({
        id: currentBanner._id,
        data: formData,
      });
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  const handleEdit = (record) => {
    setCurrentBanner(record);
    setIsOpenEdit(true);
    form.setFieldsValue({
      title: record.title,
      description: record.description,
      file: [],
    });
  };
  const uploadProps = {
    beforeUpload: () => false,
    maxCount: 1,
    accept: "image/*",
    listType: "picture-card",
  };
  return (
    <div>
      <h2>Danh Sách Banner</h2>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => setIsModalOpen(true)}
      >
        Thêm Banner
      </Button>

      <Table
        dataSource={banners || []}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      {/* Create Modal */}
      <Modal
        title="Thêm Banner"
        open={isOpenModal}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        onOk={handleSubmit}
        confirmLoading={createMutation.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên Chiến Dịch"
            name="title"
            rules={[
              { required: true, message: "Vui lòng nhập tên chiến dịch" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô Tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            name="file"
            rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}></Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Chỉnh Sửa Banner"
        open={isOpenEdit}
        onCancel={() => {
          setIsOpenEdit(false);
          setIsOpenEdit(null);
          form.resetFields();
        }}
        onOk={handleUpdate}
        confirmLoading={updateMutation.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên Chiến Dịch"
            name="title"
            rules={[
              { required: true, message: "Vui lòng nhập tên chiến dịch" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô Tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            name="file"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload
              {...uploadProps}
              defaultFileList={
                currentBanner?.image
                  ? [
                      {
                        uid: "-1",
                        name: "current.jpg",
                        status: "done",
                        url: currentBanner.image.url,
                      },
                    ]
                  : []
              }
            >
              <Button icon={<UploadOutlined />}></Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default DashboardAdmin;
