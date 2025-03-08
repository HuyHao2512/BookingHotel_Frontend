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

const UpdateRoomModal = ({ isUpdateRoomModalOpen, handleCancel, room }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    area: "",
    capacity: "",
    bed: "",
    direction: "",
    totalRoom: "",
    files: [],
  });
  useEffect(() => {
    if (ownerData && ownerData.data && ownerData.data.length > 0) {
      setPropertyId(ownerData.data[0]._id);
      setRoomData((prev) => ({
        ...prev,
        property: ownerData.data[0]._id,
      }));
    }
  }, [ownerData]);
  useEffect(() => {
    if (room) {
      setRoomData({
        name: room.name || "",
        typeroom: room.typeroom || "",
        conveniences: room.conveniences || [],
        price: room.price || "",
        isAvailable: room.isAvailable || true,
        quantity: room.quantity || "",
        area: room.area || "",
        capacity: room.capacity || "",
        bed: room.bed || "",
        direction: room.direction || "",
        totalRoom: room.totalRoom || "",
        files: room.files || [],
      });

      form.setFieldsValue({
        name: room.name,
        typeroom: room.typeroom,
        price: room.price,
        quantity: room.quantity,
        area: room.area,
        capacity: room.capacity,
        bed: room.bed,
        direction: room.direction,
        conveniences: room.conveniences,
      });

      if (room.files) {
        setFileList(
          room.files.map((file, index) => ({
            uid: index,
            name: `image-${index}`,
            url: file, // Đường dẫn ảnh đã có
          }))
        );
      }
    }
  }, [room, form]);

  const updateRoomMutation = useMutation({
    mutationFn: (formData) => ownerService.updateRoom(room._id, formData),
    onSuccess: () => {
      message.success("Cập nhật phòng thành công!");
      handleCancel();
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật phòng:", error);
      message.error("Có lỗi xảy ra khi cập nhật phòng!");
    },
  });

  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = ({ fileList }) => {
    setFileList(fileList);
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
    formData.append("totalRoom", roomData.totalRoom);
    formData.append("area", roomData.area);
    formData.append("capacity", roomData.capacity);
    formData.append("bed", roomData.bed);
    formData.append("direction", roomData.direction);
    const conveniencesString = roomData.conveniences.join(",");
    formData.append("conveniences", conveniencesString);

    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("files", file.originFileObj);
      }
    });
    console.log("Dữ liệu gửi đi:", Object.fromEntries(formData.entries()));
    updateRoomMutation.mutate(formData, {
      onSettled: () => setIsSubmitting(false),
    });
  };

  return (
    <Modal
      title="Cập Nhật Phòng"
      open={isUpdateRoomModalOpen}
      onOk={() => form.submit()}
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
            name="name"
            rules={[{ required: true, message: "Nhập tên phòng!" }]}
          >
            <Input name="name" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Loại Phòng"
            name="typeroom"
            rules={[{ required: true, message: "Chọn loại phòng!" }]}
          >
            <Select
              placeholder="Chọn loại phòng"
              onChange={(value) =>
                setRoomData({ ...roomData, typeroom: value })
              }
            >
              {isLoadingTypeRoom ? (
                <Select.Option disabled>Đang tải...</Select.Option>
              ) : (
                typeRoomData?.map((type) => (
                  <Select.Option key={type._id} value={type._id}>
                    {type.name}
                  </Select.Option>
                ))
              )}
            </Select>
          </Form.Item>

          <Form.Item
            label="Giá (VND)"
            name="price"
            rules={[{ required: true, message: "Nhập giá phòng!" }]}
          >
            <Input type="number" name="price" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Số Lượng"
            name="quantity"
            rules={[{ required: true, message: "Nhập số lượng!" }]}
          >
            <Input type="number" name="quantity" onChange={handleChange} />
          </Form.Item>
        </div>

        <Form.Item label="Tiện ích" name="conveniences">
          {isLoadingConveniences ? (
            <Spin />
          ) : (
            <Checkbox.Group
              onChange={(values) =>
                setRoomData({ ...roomData, conveniences: values })
              }
            >
              <div className="grid grid-cols-2 gap-2">
                {conveniencesData?.map((item) => (
                  <Checkbox key={item._id} value={item._id}>
                    {item.name}
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          )}
        </Form.Item>

        <Form.Item label="Hướng" name="direction">
          <Select
            onChange={(value) => setRoomData({ ...roomData, direction: value })}
          >
            <Select.Option value="Đông">Đông</Select.Option>
            <Select.Option value="Tây">Tây</Select.Option>
            <Select.Option value="Nam">Nam</Select.Option>
            <Select.Option value="Bắc">Bắc</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Hình Ảnh">
          <Upload
            beforeUpload={() => false}
            multiple
            onChange={handleImageUpload}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateRoomModal;
