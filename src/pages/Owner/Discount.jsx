import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Tag,
} from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const sampleDiscounts = [
  { id: 1, code: "SALE10", discount: 10, expiry: "2025-03-31", active: false },
  {
    id: 2,
    code: "WELCOME20",
    discount: 20,
    expiry: "2025-04-15",
    active: false,
  },
  {
    id: 3,
    code: "SPRING30",
    discount: 30,
    expiry: "2025-02-28",
    active: false,
  },
];

const Discount = () => {
  const [discounts, setDiscounts] = useState(sampleDiscounts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [form] = Form.useForm();

  const showModal = (discount) => {
    setEditingDiscount(discount);
    setIsModalOpen(true);
    form.setFieldsValue(
      discount
        ? { ...discount, expiry: moment(discount.expiry) }
        : { code: "", discount: 0, expiry: null, active: true }
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingDiscount(null);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const newDiscount = {
        ...values,
        id: editingDiscount ? editingDiscount.id : discounts.length + 1,
      };
      if (editingDiscount) {
        setDiscounts((prev) =>
          prev.map((d) => (d.id === editingDiscount.id ? newDiscount : d))
        );
      } else {
        setDiscounts((prev) => [...prev, newDiscount]);
      }
      setIsModalOpen(false);
      setEditingDiscount(null);
    });
  };

  const handleDelete = (id) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== id));
  };

  const columns = [
    { title: "Mã giảm giá", dataIndex: "code", key: "code" },
    { title: "Giảm giá (%)", dataIndex: "discount", key: "discount" },
    { title: "Ngày hết hạn", dataIndex: "expiry", key: "expiry" },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      render: (active) => (
        <Tag color={active ? "green" : "red"}>
          {active ? "Hoạt động" : "Hết hạn"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <div className="space-x-2">
          <Button onClick={() => showModal(record)}>Sửa</Button>
          <Button onClick={() => handleDelete(record.id)} danger>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quản lý mã giảm giá</h2>
      <Button type="primary" onClick={() => showModal(null)} className="mb-4">
        Thêm mã giảm giá
      </Button>
      <Table columns={columns} dataSource={discounts} rowKey="id" />

      {/* Modal thêm/sửa mã giảm giá */}
      <Modal
        title={editingDiscount ? "Chỉnh sửa mã giảm giá" : "Thêm mã giảm giá"}
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
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Discount;
