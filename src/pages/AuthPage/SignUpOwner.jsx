import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Spin,
  message,
  Upload,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as ownerService from "../../services/owner.service";
import useAmenities from "../../hooks/useAmenities";
import useCity from "../../hooks/useCity";
import useCategory from "../../hooks/useCategory";
export default function SignUpOwner() {
  const [form] = Form.useForm(); // Tạo instance của form
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hotelData, setHotelData] = useState({
    name: "",
    category: "",
    phone: "",
    owner: localStorage.getItem("userId"),
    city: "", // Khu vực
    amenities: [],
    address: "",
    email: localStorage.getItem("email"),
    description: "",
    files: [],
  });

  const [addressDetails, setAddressDetails] = useState({
    city: "",
    district: "",
    ward: "",
    street: "",
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const updatedAddress = { ...addressDetails, [name]: value };
    setAddressDetails(updatedAddress);
    const fullAddress = `${updatedAddress.street}, ${updatedAddress.ward}, ${updatedAddress.district}, ${updatedAddress.city}`;
    setHotelData({ ...hotelData, address: fullAddress });
  };

  const handleChange = (e) => {
    setHotelData({ ...hotelData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = ({ fileList }) => {
    setFileList(fileList);
    console.log("File list:", fileList);
  };

  const handleSubmit = () => {
    if (!hotelData.name || !hotelData.category || !hotelData.phone) {
      message.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", hotelData.name);
    formData.append("category", hotelData.category);
    formData.append("phone", hotelData.phone);
    formData.append("owner", hotelData.owner);
    formData.append("email", hotelData.email);
    formData.append("city", hotelData.city);
    formData.append("address", hotelData.address);
    formData.append("description", hotelData.description);
    // Gửi danh sách tiện ích dưới dạng mảng
    const amenitiesString = hotelData.amenities.join(",");
    formData.append("amenities", amenitiesString);
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj);
    });

    console.log("FormData files:", formData.getAll("files"));

    // Gửi dữ liệu qua mutation
    SignUpOwnerMutation.mutate(formData, {
      onSettled: () => {
        setIsSubmitting(false); // Kết thúc loading
      },
    });
  };

  const handleAmenitiesChange = (checkedValues) => {
    setHotelData({ ...hotelData, amenities: checkedValues });
    console.log("Checked amenities:", checkedValues);
  };
  const handleCategoryChange = (value) => {
    setHotelData({ ...hotelData, category: value });
    console.log("Category:", value);
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
  const SignUpOwnerMutation = useMutation({
    mutationFn: (formData) => ownerService.signUpOwner(formData),
    onSuccess: (data) => {
      console.log("Data:", data);
      message.success("Đăng ký thành công!");
      localStorage.removeItem("email");
      localStorage.removeItem("userId");
      navigate("/login");
    },
    onError: (error) => {
      console.log("Error:", error);
      message.error("Đăng ký thất bại!");
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-4 mb-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Đăng ký thông tin khách sạn
      </h2>
      <Form
        layout="vertical"
        className="space-y-4"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Tên khách sạn"
          rules={[{ required: true, message: "Vui lòng nhập tên khách sạn!" }]}
        >
          <Input
            name="name"
            placeholder="Nhập tên khách sạn"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Loại hình lưu trú"
          rules={[
            { required: true, message: "Vui lòng chọn loại hình lưu trú!" },
          ]}
        >
          <Select
            name="category"
            placeholder="Chọn loại hình lưu trú"
            onChange={handleCategoryChange}
          >
            {isCategoryLoading ? (
              <Select.Option value="" disabled>
                Đang tải danh mục...
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
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ!" },
          ]}
        >
          <Input
            name="phone"
            placeholder="Nhập số điện thoại"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Khu vực"
          rules={[{ required: true, message: "Vui lòng nhập khu vực!" }]}
        >
          <Select
            name="area"
            placeholder="Chọn khu vực"
            onChange={(value) => setHotelData({ ...hotelData, city: value })}
          >
            {isCityLoading ? (
              <Select.Option value="" disabled>
                Đang tải danh sách thành phố...
              </Select.Option>
            ) : isCityError ? (
              <Select.Option value="" disabled>
                Lỗi khi tải danh sách thành phố
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

        <Form.Item label="Địa chỉ chi tiết">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="city"
              placeholder="Thành phố"
              onChange={handleAddressChange}
            />
            <Input
              name="district"
              placeholder="Quận"
              onChange={handleAddressChange}
            />
            <Input
              name="ward"
              placeholder="Phường"
              onChange={handleAddressChange}
            />
            <Input
              name="street"
              placeholder="Tên đường"
              onChange={handleAddressChange}
            />
          </div>
        </Form.Item>

        <Form.Item label="Tiện ích">
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
              onChange={handleAmenitiesChange}
            />
          )}
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input.TextArea
            name="description"
            placeholder="Nhập mô tả về khách sạn"
            rows={4}
            onChange={handleChange}
          />
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              minHeight: "50px",
              whiteSpace: "pre-line", // Giữ xuống dòng
            }}
          >
            {form.getFieldValue("description")}
          </div>
        </Form.Item>

        <Form.Item label="Hình ảnh">
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            loading={isSubmitting} // Hiển thị loading khi đang gửi form
          >
            {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
