import {
  Table,
  Button,
  Modal,
  Input,
  Select,
  Form,
  message,
  Tag,
  Switch,
} from "antd";
import { useState } from "react";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import AddRoomModal from "../../components/Modal/AddRoomModal";
import UpdateRoomModal from "../../components/Modal/UpdateRoomModal";
const { Option } = Select;

const ListRoom = () => {
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [isUpdateRoomModalOpen, setIsUpdateRoomModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form] = Form.useForm();
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Phòng Deluxe",
      type: "Giường Đôi",
      price: 500000,
      status: "Trống",
    },
    {
      id: 2,
      name: "Phòng Superior",
      type: "Giường Đơn",
      price: 350000,
      status: "Đã đặt",
    },
  ]);
  const showModal = () => setIsAddRoomModalOpen(true);
  const showModalUpdate = (record) => {
    setSelectedRecord(record); // Lưu dữ liệu của hàng được chọn
    setIsUpdateRoomModalOpen(true);
  };
  // Xử lý khi nhấn OK trong modal
  const handleOk = () => {
    form.validateFields().then((values) => {
      setRooms([...rooms, { id: rooms.length + 1, ...values }]);
      form.resetFields();
      setIsAddRoomModalOpen(false);
      message.success("Thêm phòng thành công!");
    });
  };
  const handleOkUpdate = () => {
    console.log("OK");
    setSelectedRecord(null);
  };
  const handleCancel = () => setIsAddRoomModalOpen(false);
  const handleCancelUpdate = () => setIsUpdateRoomModalOpen(false);
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  const columns = [
    { title: "Tên phòng", dataIndex: "name", key: "name" },
    {
      title: "Giá (VND)",
      dataIndex: "price",
      key: "price",
      render: (price) => price.toLocaleString(),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Trống" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Chỉnh sửa",
      key: "action",
      render: (_, record) => (
        <div>
          <Button
            onClick={() => showModalUpdate(record)}
            className="bg-orange-500 text-white"
          >
            <InfoCircleOutlined />
          </Button>
        </div>
      ),
    },
    {
      title: "Ẩn tạm thời",
      key: "disable",
      render: (_, record) => <Switch defaultChecked onChange={onChange} />,
    },
  ];

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h2 className="text-lg font-semibold mb-4">Quản lý Phòng</h2>

      <Button type="primary" onClick={showModal} className="mb-4">
        + Thêm Phòng
      </Button>

      <Table columns={columns} dataSource={rooms} rowKey="id" />

      <AddRoomModal
        isAddRoomModalOpen={isAddRoomModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <UpdateRoomModal
        isUpdateRoomModalOpen={isUpdateRoomModalOpen}
        handleOk={handleOkUpdate}
        handleCancel={handleCancelUpdate}
      />
    </div>
  );
};

export default ListRoom;
