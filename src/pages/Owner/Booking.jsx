import { Table, Button, Modal, Tag } from "antd";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useFindByOwner from "../../hooks/useFindByOwner";
import useBookingByProperty from "../../hooks/useBookingByProperty";
import * as ownerService from "../../services/owner.service"; // Giả sử có service để gọi API
import { message } from "antd";
import { useParams } from "react-router-dom";

const Booking = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { id } = useParams();
  const {
    data: bookingsData,
    isLoading,
    isError,
    refetch, // Thêm refetch để cập nhật dữ liệu sau khi thay đổi trạng thái
  } = useBookingByProperty(id);
  // Hàm định dạng ngày giờ
  const formatDate = (isoDate) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }); // Ví dụ: "09/03/2025"
  };

  // Mutation để xác nhận booking
  const confirmMutation = useMutation({
    mutationFn: (id) => ownerService.updateBookingStatus(id, "confirmed"),
    onSuccess: () => {
      message.success("Đã xác nhận đơn đặt phòng!");
      refetch(); // Cập nhật lại danh sách bookings
    },
    onError: (error) => {
      message.error("Có lỗi khi xác nhận: " + error.message);
    },
  });

  // Mutation để hủy booking
  const cancelMutation = useMutation({
    mutationFn: (id) => ownerService.updateBookingStatus(id, "cancelled"),
    onSuccess: () => {
      message.success("Đã hủy đơn đặt phòng!");
      refetch(); // Cập nhật lại danh sách bookings
    },
    onError: (error) => {
      message.error("Có lỗi khi hủy: " + error.message);
    },
  });

  const showModal = (record) => {
    setSelectedBooking(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleConfirm = (id) => {
    confirmMutation.mutate(id, "confirmed");
  };

  const handleCancelBooking = (id) => {
    cancelMutation.mutate(id, "cancelled");
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Có lỗi xảy ra</p>;

  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "name", // Đảm bảo key khớp với dữ liệu từ API
      key: "name",
    },
    {
      title: "Nhận phòng",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (checkIn) => formatDate(checkIn), // Định dạng ngày giờ
    },
    {
      title: "Trả phòng",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (checkOut) => formatDate(checkOut), // Định dạng ngày giờ
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `${price.toLocaleString("vi-VN")} VND`, // Định dạng tiền tệ
    },
    {
      title: "Thanh toán",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (isPaid) => (isPaid ? "Đã thanh toán" : "Chưa thanh toán"),
    },
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
              : status === "completed"
              ? "blue"
              : "red"
          }
        >
          {status === "pending"
            ? "Chờ xác nhận"
            : status === "confirmed"
            ? "Đã xác nhận"
            : status === "completed"
            ? "Hoàn thành"
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
            <Button
              onClick={() => handleConfirm(record._id)} // Sử dụng _id thay vì id nếu API dùng _id
              type="primary"
              loading={confirmMutation.isLoading}
            >
              Xác nhận
            </Button>
          )}
          {record.status !== "cancelled" && record.status !== "completed" && (
            <Button
              onClick={() => handleCancelBooking(record._id)}
              danger
              loading={cancelMutation.isLoading}
            >
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
      <Table columns={columns} dataSource={bookingsData} rowKey="_id" />{" "}
      {/* Sửa rowKey thành "_id" nếu API dùng _id */}
      <Modal
        title="Chi tiết đơn đặt phòng"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedBooking && (
          <div>
            <p>
              <strong>Khách hàng:</strong> {selectedBooking.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedBooking.email}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {selectedBooking.phone}
            </p>
            <p>
              <strong>Ghi chú:</strong>{" "}
              {selectedBooking.description === ""
                ? "Không có ghi chú"
                : selectedBooking.description}
            </p>
            <p>
              <strong>Phương thức thanh toán:</strong>{" "}
              {selectedBooking.paymentMethod === "2"
                ? "Online"
                : selectedBooking.paymentMethod === "1"
                ? "Trực tiếp"
                : "Không xác định"}
            </p>
            {selectedBooking.paymentMethod === "2" ? (
              <p>
                <strong>Trạng thái thanh toán:</strong>
                {selectedBooking.isPaid === true
                  ? " Đã thanh toán"
                  : " Chưa thanh toán"}
              </p>
            ) : (
              <p></p>
            )}

            <p>
              <strong>Nhận phòng:</strong> {formatDate(selectedBooking.checkIn)}
            </p>
            <p>
              <strong>Trả phòng:</strong> {formatDate(selectedBooking.checkOut)}
            </p>
            <p>
              <strong>Tổng tiền:</strong>{" "}
              {selectedBooking.totalPrice.toLocaleString("vi-VN")} VND
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {selectedBooking.status === "pending"
                ? "Chờ xác nhận"
                : selectedBooking.status === "confirmed"
                ? "Đã xác nhận"
                : selectedBooking.status === "completed"
                ? "Hoàn thành"
                : "Đã hủy"}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Booking;
