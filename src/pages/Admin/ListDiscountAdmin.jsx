import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Switch,
  message,
} from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import * as userService from "../../services/user.service";
import * as ownwerService from "../../services/owner.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ListDiscountAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [switchLoading, setSwitchLoading] = useState({});

  const mutation = useMutation({
    mutationFn: (data) =>
      ownwerService.createDiscount({
        ...data,
        isActive: true,
      }),
    onSuccess: () => {
      form.resetFields();
      setIsModalOpen(false);
      message.success("Thêm mã giảm giá thành công");
      queryClient.invalidateQueries(["discountAdmin"]);
    },
    onError: (error) => {
      console.error("Error adding discount:", error);
      message.error(
        error?.response?.data?.message || "Thêm mã giảm giá thất bại"
      );
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: ({ code, isActive }) =>
      ownwerService.updateDiscount(code, { isActive }),
    onSuccess: () => {
      message.destroy();
      message.success("Cập nhật trạng thái thành công");
      queryClient.invalidateQueries(["discountAdmin"]); // Sửa lại query key
    },
    onError: () => {
      message.error("Cập nhật trạng thái thất bại");
    },
  });

  const {
    isError,
    isLoading,
    data: discounts,
  } = useQuery({
    queryKey: ["discountAdmin"],
    queryFn: () => userService.getDiscountPublic(),
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      mutation.mutate({
        code: values.code,
        percentage: values.discount,
        expireDate: dayjs(values.expiry).format("YYYY-MM-DD"),
        description: values.description || "",
      });
    } catch (err) {
      console.log("Validation failed:", err);
    }
  };

  const handleToggleActive = (code, isActive) => {
    // Bắt đầu loading cho switch tương ứng
    setSwitchLoading((prev) => ({ ...prev, [code]: true }));

    toggleActiveMutation.mutate(
      { code, isActive },
      {
        onSettled: () => {
          // Kết thúc loading bất kể thành công hay thất bại
          setSwitchLoading((prev) => ({ ...prev, [code]: false }));
        },
      }
    );
  };

  const columns = [
    { title: "Mã giảm giá", dataIndex: "code", key: "code" },
    { title: "Giảm giá (%)", dataIndex: "percentage", key: "percentage" },
    {
      title: "Ngày hết hạn",
      dataIndex: "expireDate",
      key: "expireDate",
      render: (date) => dayjs(date).format("DD-MM-YYYY"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Switch
          checked={record.isActive}
          loading={switchLoading[record.code]} // Loading theo từng mã
          onChange={(checked) => handleToggleActive(record.code, checked)}
        />
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading discounts</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quản lý mã giảm giá</h2>
      <Button type="primary" onClick={showModal} className="mb-4">
        Thêm mã giảm giá
      </Button>
      <Table columns={columns} dataSource={discounts.data} rowKey="id" />

      <Modal
        title={"Thêm mã giảm giá"}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="code"
            label="Mã giảm giá"
            rules={[{ required: true, message: "Vui lòng nhập mã giảm giá" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Phần trăm giảm giá"
            rules={[{ required: true, message: "Nhập số phần trăm" }]}
          >
            <InputNumber min={1} max={100} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="expiry"
            label="Ngày hết hạn"
            rules={[{ required: true, message: "Chọn ngày hết hạn" }]}
          >
            <DatePicker format="MM-DD-YYYY" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea
              style={{ height: "100px" }}
              placeholder="Mô tả (tuỳ chọn)"
            ></Input.TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ListDiscountAdmin;
