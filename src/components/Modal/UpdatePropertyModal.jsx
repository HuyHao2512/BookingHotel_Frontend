import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Spin,
  message,
  Upload,
  Select,
  Modal,
  Image,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ownerService from "../../services/owner.service";
import useAmenities from "../../hooks/useAmenities";
import useCity from "../../hooks/useCity";
import useCategory from "../../hooks/useCategory";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function UpdatePropertyModal({ property, isVisible, onClose }) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [fileList, setFileList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [removeImageIds, setRemoveImageIds] = useState([]);
  const [propertyData, setPropertyData] = useState({
    name: "",
    owner: "",
    category: "",
    city: "",
    amenities: [],
    phone: "",
    email: "",
    city: "",
    address: "",
    description: "",
    googleMapUrl: "",
    amenities: [],
    files: [],
  });

  const [amenities, setAmenities] = useState([]);
  useEffect(() => {
    if (property) {
      setPropertyData({
        name: property.name || "",
        owner: property.owner?._id || "",
        category: property.category?._id || "",
        city: property.city?._id || "",
        amenities: (property.amenities || []).map((item) =>
          typeof item === "string"
            ? item
            : item._id?.toString?.() || item.toString()
        ),
        phone: property.phone || "",
        email: property.email || "",
        address: property.address || "",
        description: property.description || "",
        googleMapUrl: property.googleMapUrl || "",
        files: property.images || [],
      });
      setAmenities(
        (property.amenities || []).map((item) =>
          typeof item === "string"
            ? item
            : item._id?.toString?.() || item.toString()
        )
      );
      form.setFieldsValue({
        name: property.name,
        category: property.category?._id,
        phone: property.phone,
        description: property.description,
        lat: property.lat,
        long: property.long,
        city: property.city?._id,
        address: property.address,
        amenities: (property.amenities || []).map((item) =>
          typeof item === "string"
            ? item
            : item._id?.toString?.() || item.toString()
        ),
        googleMapUrl: property.googleMapUrl || "",
      });
      if (property.images) {
        setFileList(
          property.images.map((file, index) => ({
            uid: index,
            name: `image-${index}`,
            url: file.url,
            publicId: file.publicId,
          }))
        );
      }
    }
  }, [property, form]);

  const handleChange = (e) => {
    setPropertyData({ ...propertyData, [e.target.name]: e.target.value });
  };
  const handleImageUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleRemoveImage = (publicId) => {
    setRemoveImageIds((prev) =>
      prev.includes(publicId)
        ? prev.filter((id) => id !== publicId)
        : [...prev, publicId]
    );
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("name", propertyData.name);
      formData.append("category", propertyData.category);
      formData.append("phone", propertyData.phone);
      formData.append("email", propertyData.email || "");
      formData.append("city", propertyData.city || "");
      formData.append("address", propertyData.address || "");
      formData.append("description", propertyData.description || "");
      formData.append("googleMapUrl", propertyData.googleMapUrl || "");

      if (propertyData.amenities?.length) {
        formData.append("amenities", JSON.stringify(amenities));
      }

      if (fileList.length > 0) {
        fileList.forEach((file) => {
          if (file.originFileObj) {
            formData.append("files", file.originFileObj);
          }
        });
      }

      if (removeImageIds.length > 0) {
        formData.append("removeImageIds", JSON.stringify(removeImageIds));
      }

      updateMutation.mutate(formData, {
        onSettled: () => setIsSubmitting(false),
      });
    } catch (err) {
      console.error("Validation failed", err);
    }
  };
  const { data: amenitiesData, isLoading, isError } = useAmenities();
  const {
    data: CategoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useCategory();
  const {
    data: cityData,
    isLoading: isCityLoading,
    isError: isCityError,
  } = useCity();
  const updateMutation = useMutation({
    mutationFn: (formData) => ownerService.updateProperty(id, formData),
    onSuccess: () => {
      message.success("Cập nhật khách sạn thành công!");
      setFileList([]);
      setRemoveImageIds([]);
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["property", id], // tuỳ theo query bạn dùng khi fetch dữ liệu
      });
    },
    onError: (error) => {
      console.error(error);
      message.error("Cập nhật thất bại!");
    },
  });
  return (
    <Modal
      title="Thông Tin Nơi Lưu Trú"
      open={isVisible}
      onCancel={onClose}
      width={900}
      confirmLoading={isSubmitting}
      onOk={() => form.submit()}
    >
      <div className="max-w-4xl mx-auto mb-4 mt-4">
        <Form
          layout="vertical"
          className="space-y-4"
          onFinish={handleSubmit}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Tên khách sạn"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên khách sạn!" },
            ]}
          >
            <Input name="name" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Loại hình lưu trú"
            name="category"
            rules={[{ required: true, message: "Vui lòng chọn loại hình!" }]}
          >
            <Select
              placeholder="Chọn loại hình"
              onChange={(value) =>
                setPropertyData({ ...propertyData, category: value })
              }
            >
              {isCategoryLoading ? (
                <Select.Option value="" disabled>
                  <div className="flex justify-center items-center h-64">
                    <Loading />
                  </div>
                </Select.Option>
              ) : isCategoryError ? (
                <Select.Option value="" disabled>
                  Lỗi khi tải danh mục
                </Select.Option>
              ) : (
                CategoryData?.map((item) => (
                  <Select.Option key={item._id} value={item._id}>
                    {item.name}
                  </Select.Option>
                ))
              )}
            </Select>
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input name="phone" onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Khu vực" name="city">
            <Select
              placeholder="Chọn thành phố"
              name="city"
              onChange={(value) =>
                setPropertyData({ ...propertyData, city: value })
              }
            >
              {isCityLoading ? (
                <Select.Option value="" disabled>
                  Đang tải thành phố...
                </Select.Option>
              ) : isCityError ? (
                <Select.Option value="" disabled>
                  Lỗi tải thành phố
                </Select.Option>
              ) : (
                cityData?.map((item) => (
                  <Select.Option key={item._id} value={item._id}>
                    {item.name}
                  </Select.Option>
                ))
              )}
            </Select>
          </Form.Item>

          <Form.Item label="Địa chỉ" name="address">
            <Input name="address" onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="URL Google Map"
            name="googleMapUrl"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập URL Google Map!",
              },
            ]}
          >
            <Input
              name="googleMapUrl"
              placeholder="URL Google Map"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Tiện ích" name="amenities">
            {isLoading ? (
              <Spin />
            ) : isError ? (
              <p className="text-red-500">Không thể tải tiện ích.</p>
            ) : (
              <Checkbox.Group
                options={amenitiesData?.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
                onChange={(checkedValues) => {
                  setAmenities(checkedValues);
                }}
              />
            )}
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea
              rows={4}
              placeholder="Nhập mô tả"
              name="description"
              onChange={handleChange}
            />
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
            <div className="grid grid-cols-4 gap-4 mt-4">
              {property?.images &&
                property.images.map((file, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={file.url}
                      alt={`image-${index}`}
                      className="h-4 object-cover rounded"
                    />
                    <Checkbox
                      className="absolute top-2 left-2"
                      checked={removeImageIds.includes(file.publicId)}
                      onChange={() => handleRemoveImage(file.publicId)}
                    >
                      Xóa
                    </Checkbox>
                  </div>
                ))}
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
