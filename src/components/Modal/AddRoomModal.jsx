import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Button,
  Spin,
  Checkbox,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useTypeRoom from "../../hooks/useTypeRoom";
import useConveniences from "../../hooks/useConveniences";
import useFindByOwner from "../../hooks/useFindByOwner";
import * as ownerService from "../../services/owner.service";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
const AddRoomModal = ({ isAddRoomModalOpen, handleCancel }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const {
    data: typeRoomData,
    isLoading: isLoadingTypeRoom,
    isError: isErrorTypeRoom,
  } = useTypeRoom();
  const {
    data: conveniencesData,
    isLoading: isLoadingConveniences,
    isError: isErrorConveniences,
  } = useConveniences();
  const {
    data: ownerData,
    isLoading: isLoadingOwner,
    isError: isErrorOwner,
  } = useFindByOwner();
  const [propertyId, setPropertyId] = useState(null);
  const [roomData, setRoomData] = useState({
    name: "",
    typeroom: "",
    property: null,
    conveniences: [],
    price: "",
    isAvailable: true,
    quantity: "",
    amenities: [],
    area: "",
    capacity: "",
    bed: "",
    direction: "",
    totalRoom: "",
    quantity: "",
    files: [],
  });
  useEffect(() => {
    if (ownerData && ownerData.data && ownerData.data.length > 0) {
      setPropertyId(id);
      setRoomData((prev) => ({
        ...prev,
        property: id,
      }));
    }
  }, [ownerData]);
  const createRoomMutation = useMutation({
    mutationFn: (formData) => ownerService.createRoom(formData),
    onSuccess: () => {
      message.success("Tạo phòng thành công!");
      handleCancel();
    },
    onError: (error) => {
      console.error("Lỗi khi tạo phòng:", error);
      message.error("Có lỗi xảy ra khi tạo phòng!");
    },
  });

  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };
  const handleImageUpload = ({ fileList }) => {
    setFileList(fileList);
    console.log("File list:", fileList);
  };
  const handleSubmit = () => {
    if (
      !roomData.name ||
      !roomData.typeroom ||
      !roomData.price ||
      !roomData.quantity ||
      !roomData.area ||
      !roomData.capacity ||
      !roomData.bed ||
      !roomData.direction ||
      !roomData.files
    ) {
      message.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", roomData.name);
    formData.append("typeroom", roomData.typeroom);
    formData.append("price", roomData.price);
    formData.append("quantity", roomData.quantity);
    formData.append("property", roomData.property);
    formData.append("isAvailable", roomData.isAvailable);
    formData.append("totalRoom", roomData.quantity);
    formData.append("area", roomData.area);
    formData.append("capacity", roomData.capacity);
    formData.append("bed", roomData.bed);
    formData.append("direction", roomData.direction);
    const conveniencesString = roomData.conveniences.join(",");
    formData.append("conveniences", conveniencesString);
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj);
    });
    console.log("Dữ liệu gửi đi:", Object.fromEntries(formData.entries()));
    createRoomMutation.mutate(formData, {
      onSettled: () => {
        setIsSubmitting(false);
      },
    });
  };

  const handleChangeTypeRoom = (value) => {
    setRoomData({ ...roomData, typeroom: value });
    console.log("type room:", value);
  };
  const handleChangeConveniences = (values) => {
    setRoomData({ ...roomData, conveniences: values });
    console.log(values);
  };
  const handleChangeDirection = (value) => {
    setRoomData({ ...roomData, direction: value });
    console.log("direction:", value);
  };
  return (
    <div>
      <Modal
        title="Thêm Phòng Mới"
        open={isAddRoomModalOpen}
        onOk={() => form.submit()} // Khi nhấn OK, submit form
        onCancel={handleCancel}
        width={800}
        confirmLoading={isSubmitting}
      >
        <Form
          form={form}
          layout="horizontal"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Tên Phòng"
              rules={[{ required: true, message: "Nhập tên phòng!" }]}
            >
              <Input name="name" onChange={handleChange} />
            </Form.Item>

            <Form.Item
              label="Loại Phòng"
              rules={[{ required: true, message: "Chọn loại phòng!" }]}
            >
              <Select
                name="typeroom"
                placeholder="Chọn loại phòng"
                onChange={handleChangeTypeRoom}
              >
                {isLoadingTypeRoom && (
                  <Select.Option value="" disabled>
                    <div className="flex justify-center items-center h-64">
                      <Loading />
                    </div>
                  </Select.Option>
                )}

                {isErrorTypeRoom && (
                  <Select.Option value="" disabled>
                    Lỗi khi tải danh mục
                  </Select.Option>
                )}

                {!isLoadingTypeRoom &&
                  !isErrorTypeRoom &&
                  typeRoomData?.map((type) => (
                    <Select.Option key={type._id} value={type._id}>
                      {type.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Giá (VND)"
              rules={[{ required: true, message: "Nhập giá phòng!" }]}
            >
              <Input type="number" name="price" onChange={handleChange} />
            </Form.Item>

            <Form.Item
              label="Số Lượng"
              rules={[{ required: true, message: "Chọn trạng thái!" }]}
            >
              <Input type="number" name="quantity" onChange={handleChange} />
            </Form.Item>
          </div>
          <Form.Item label="Tiện ích">
            {isLoadingConveniences ? (
              <Spin />
            ) : isErrorConveniences ? (
              <p className="text-red-500">Không thể tải tiện ích.</p>
            ) : (
              <Checkbox.Group onChange={handleChangeConveniences}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                  }}
                >
                  {conveniencesData?.map((item) => (
                    <Checkbox key={item._id} value={item._id}>
                      {item.name}
                    </Checkbox>
                  ))}
                </div>
              </Checkbox.Group>
            )}
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Diện Tích"
              rules={[{ required: true, message: "Nhập diện tích!" }]}
            >
              <Input type="number" name="area" onChange={handleChange} />
            </Form.Item>
            <Form.Item
              label="Số Người"
              rules={[{ required: true, message: "Nhập số người!" }]}
            >
              <Input type="number" name="capacity" onChange={handleChange} />
            </Form.Item>
            <Form.Item
              label="Giường"
              rules={[{ required: true, message: "Nhập số giường!" }]}
            >
              <Input type="number" name="bed" onChange={handleChange} />
            </Form.Item>
            <Form.Item
              label="Hướng"
              rules={[{ required: true, message: "Nhập hướng!" }]}
            >
              <Select name="direction" onChange={handleChangeDirection}>
                <Select.Option value="Đông">Đông</Select.Option>
                <Select.Option value="Tây">Tây</Select.Option>
                <Select.Option value="Nam">Nam</Select.Option>
                <Select.Option value="Bắc">Bắc</Select.Option>
                <Select.Option value="Đông Nam">Đông Nam</Select.Option>
                <Select.Option value="Đông Bắc">Đông Bắc</Select.Option>
                <Select.Option value="Tây Nam">Tây Nam</Select.Option>
                <Select.Option value="Tây Bắc">Tây Bắc</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item label="Hình Ảnh">
            <Upload
              beforeUpload={() => false} // Không upload ngay lập tức
              multiple={true} // Chọn nhiều ảnh
              onChange={handleImageUpload}
              accept="image/*"
              fileList={fileList} // Hiển thị danh sách ảnh đã chọn
            >
              <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddRoomModal;
