import React from "react";
import { Modal, Form, Input, Select, Upload, Button } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
const AddRoomModal = ({ isAddRoomModalOpen, handleOk, handleCancel }) => {
  const [form] = Form.useForm();
  const props = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const [selectedAmeneties, setSelectedAmenities] = useState([]);

  const handleChange = (values) => {
    setSelectedAmenities(values);
  };
  return (
    <div>
      <Modal
        title="Thêm Phòng Mới"
        open={isAddRoomModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="horizontal">
          <Form.Item
            name="name"
            label="Tên Phòng"
            rules={[{ required: true, message: "Nhập tên phòng!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="Loại Phòng"
            rules={[{ required: true, message: "Chọn loại phòng!" }]}
          >
            <Select>
              <Option value="Giường Đôi">Giường Đôi</Option>
              <Option value="Giường Đơn">Giường Đơn</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá (VND)"
            rules={[{ required: true, message: "Nhập giá phòng!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Số Lượng"
            rules={[{ required: true, message: "Chọn trạng thái!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="amenities"
            label="Tiện ích"
            rules={[{ required: true, message: "Chọn tiện ích!" }]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn nhiều tùy chọn"
              value={selectedAmeneties}
              onChange={handleChange}
              className="w-full"
              options={[
                { value: "option1", label: "Tùy chọn 1" },
                { value: "option2", label: "Tùy chọn 2" },
                { value: "option3", label: "Tùy chọn 3" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="area"
            label="Diện Tích"
            rules={[{ required: true, message: "Nhập diện tích!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="capacity"
            label="Số Người"
            rules={[{ required: true, message: "Nhập số người!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="bed"
            label="Giường"
            rules={[{ required: true, message: "Nhập số giường!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="direction"
            label="Hướng"
            rules={[{ required: true, message: "Nhập hướng!" }]}
          >
            <Select>
              <Option value="Đông">Đông</Option>
              <Option value="Tây">Tây</Option>
              <Option value="Nam">Nam</Option>
              <Option value="Bắc">Bắc</Option>
              <Option value="Đông Nam">Đông Nam</Option>
              <Option value="Đông Bắc">Đông Bắc</Option>
              <Option value="Tây Nam">Tây Nam</Option>
              <Option value="Tây Bắc">Tây Bắc</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="image"
            label="Hình Ảnh"
            rules={[{ required: true, message: "Chọn hình ảnh!" }]}
          >
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddRoomModal;
