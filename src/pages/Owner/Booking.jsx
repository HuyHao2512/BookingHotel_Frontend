import { Table, Button, Modal, Tag } from "antd";
import { useState } from "react";
const sampleBookings = [
  {
    id: "B001",
    customer: "Nguyễn Văn A",
    checkIn: "2025-03-10",
    checkOut: "2025-03-12",
    roomType: "Phòng Deluxe",
    price: 1200000,
    status: "pending", // pending, confirmed, cancelled, completed
  },
  {
    id: "B002",
    customer: "Trần Thị B",
    checkIn: "2025-03-15",
    checkOut: "2025-03-17",
    roomType: "Phòng Superior",
    price: 900000,
    status: "confirmed",
  },
  {
    id: "B003",
    customer: "Lê Hoàng C",
    checkIn: "2025-04-01",
    checkOut: "2025-04-05",
    roomType: "Phòng Standard",
    price: 700000,
    status: "cancelled",
  },
  {
    id: "B004",
    customer: "Phạm Minh D",
    checkIn: "2025-04-10",
    checkOut: "2025-04-12",
    roomType: "Phòng Suite",
    price: 1500000,
    status: "completed",
  },
];
const Booking = () => {
  const bookings = sampleBookings;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const showModal = (record) => {
    setSelectedBooking(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleConfirm = (id) => {
    console.log("Xác nhận đơn hàng", id);
  };

  const handleCancelBooking = (id) => {
    console.log("Hủy đơn hàng", id);
  };

  const columns = [
    { title: "Khách hàng", dataIndex: "customer", key: "customer" },
    { title: "Nhận phòng", dataIndex: "checkIn", key: "checkIn" },
    { title: "Trả phòng", dataIndex: "checkOut", key: "checkOut" },
    { title: "Loại phòng", dataIndex: "roomType", key: "roomType" },
    { title: "Tổng tiền", dataIndex: "totalPrice", key: "totalPrice" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "pending"
              ? "orange"
              : status === "confirmed"
              ? "green"
              : "red"
          }
        >
          {status === "pending"
            ? "Chờ xác nhận"
            : status === "confirmed"
            ? "Đã xác nhận"
            : "Đã hủy"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <div className="space-x-2">
          <Button onClick={() => showModal(record)}>Xem</Button>
          {record.status === "pending" && (
            <Button onClick={() => handleConfirm(record.id)} type="primary">
              Xác nhận
            </Button>
          )}
          {record.status !== "canceled" && (
            <Button onClick={() => handleCancelBooking(record.id)} danger>
              Hủy
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold mb-4">Quản lý đơn đặt phòng</h2>
      <Table columns={columns} dataSource={bookings} rowKey="id" />

      {/* Modal xem chi tiết */}
      <Modal
        title="Chi tiết đơn đặt phòng"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedBooking && (
          <div>
            <p>
              <strong>Khách hàng:</strong> {selectedBooking.customer}
            </p>
            <p>
              <strong>Nhận phòng:</strong> {selectedBooking.checkIn}
            </p>
            <p>
              <strong>Trả phòng:</strong> {selectedBooking.checkOut}
            </p>
            <p>
              <strong>Loại phòng:</strong> {selectedBooking.roomType}
            </p>
            <p>
              <strong>Tổng tiền:</strong> {selectedBooking.totalPrice}
            </p>
            <p>
              <strong>Trạng thái:</strong> {selectedBooking.status}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Booking;
