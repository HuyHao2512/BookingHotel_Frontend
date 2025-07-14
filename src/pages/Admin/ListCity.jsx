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
} from "antd";
import { useMutation } from "@tanstack/react-query";
import * as adminService from "../../services/admin.service";
import { UploadOutlined } from "@ant-design/icons";

function ListCity() {
  const { data: cities, isLoading, error, refetch } = useCity();
  const [isOpenModal, setIsModalOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [currentCity, setCurrentCity] = useState(null);
  const [form] = Form.useForm();
  const createMutation = useMutation({
    mutationFn: (data) => adminService.createCity(data),
    onSuccess: () => {
      setIsModalOpen(false);
      form.resetFields();
      message.success("Thêm thành phố thành công");
      refetch();
    },
    onError: (error) => {
      console.error("Error adding city:", error);
      message.error(
        error?.response?.data?.message || "Thêm thành phố thất bại"
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => adminService.updateCity(id, data),
    onSuccess: () => {
      setIsOpenEdit(false);
      form.resetFields();
      setCurrentCity(null);
      message.success("Cập nhật thành phố thành công");
      refetch();
    },
    onError: (error) => {
      console.error("Error updating city:", error);
      message.error(
        error?.response?.data?.message || "Cập nhật thành phố thất bại"
      );
    },
  });
  if (isLoading) return <Spin size="large" />;
  if (error) return <p>Có lỗi</p>;

  const columns = [
    { title: "Tên Thành Phố", dataIndex: "name", key: "name" },
    { title: "Quốc gia", dataIndex: "country", key: "country" },
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

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("country", values.country);

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

      formData.append("name", values.name);
      formData.append("country", values.country);

      if (values.file && values.file[0]?.originFileObj) {
        formData.append("file", values.file[0].originFileObj);
      }

      updateMutation.mutate({
        id: currentCity._id,
        data: formData,
      });
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  const handleEdit = (record) => {
    setCurrentCity(record);
    setIsOpenEdit(true);
    form.setFieldsValue({
      name: record.name,
      country: record.country,
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
      <h2>Danh Sách Thành Phố</h2>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => setIsModalOpen(true)}
      >
        Thêm Thành Phố
      </Button>

      <Table
        dataSource={cities || []}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      {/* Create Modal */}
      <Modal
        title="Thêm Thành Phố"
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
            label="Tên Thành Phố"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên thành phố" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Quốc Gia"
            name="country"
            rules={[{ required: true, message: "Vui lòng nhập quốc gia" }]}
          >
            <Select>
              <Select.Option value="Vietnam">Việt Nam</Select.Option>
              <Select.Option value="Foreign">Nước Ngoài</Select.Option>
            </Select>
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
        title="Chỉnh Sửa Thành Phố"
        open={isOpenEdit}
        onCancel={() => {
          setIsOpenEdit(false);
          setCurrentCity(null);
          form.resetFields();
        }}
        onOk={handleUpdate}
        confirmLoading={updateMutation.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên Thành Phố"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên thành phố" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Quốc Gia"
            name="country"
            rules={[{ required: true, message: "Vui lòng nhập quốc gia" }]}
          >
            <Select>
              <Select.Option value="Vietnam">Việt Nam</Select.Option>
              <Select.Option value="Foreign">Nước Ngoài</Select.Option>
            </Select>
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
                currentCity?.image
                  ? [
                      {
                        uid: "-1",
                        name: "current.jpg",
                        status: "done",
                        url: currentCity.image.url,
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

export default ListCity;
