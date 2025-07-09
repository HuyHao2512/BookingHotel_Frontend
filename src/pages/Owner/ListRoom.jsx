import { Table, Button, Tag, Switch, message } from "antd";
import { useState, useEffect } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import AddRoomModal from "../../components/Modal/AddRoomModal";
import UpdateRoomModal from "../../components/Modal/UpdateRoomModal";
import useListRoomByOwner from "../../hooks/useListRoomByOwner";
import { updateRoomStatus } from "../../services/owner.service";
import { useParams } from "react-router-dom";

const ListRoom = () => {
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [isUpdateRoomModalOpen, setIsUpdateRoomModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { id } = useParams();
  const { data: rooms } = useListRoomByOwner(id);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    if (rooms) {
      setDataSource([...rooms]);
    }
  }, [rooms]);

  const showModal = () => setIsAddRoomModalOpen(true);
  const handleOkUpdate = () => setSelectedRecord(null);
  const handleCancel = () => setIsAddRoomModalOpen(false);
  const handleCancelUpdate = () => setIsUpdateRoomModalOpen(false);

  const handleUpdate = (record) => {
    setSelectedRecord(record);
    setIsUpdateRoomModalOpen(true);
  };

  const handleToggleAvailability = async (roomId, newStatus) => {
    setDataSource((prev) =>
      prev.map((room) =>
        room._id === roomId ? { ...room, isAvailable: newStatus } : room
      )
    );

    try {
      await updateRoomStatus(roomId, { isAvailable: newStatus });
      message.destroy();
      message.success(`Phòng đã được ${newStatus ? "hiển thị" : "ẩn"}`);
    } catch (error) {
      message.destroy();
      message.error("Cập nhật trạng thái thất bại!");
      setDataSource((prev) =>
        prev.map((room) =>
          room._id === roomId ? { ...room, isAvailable: !newStatus } : room
        )
      );
    }
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
      title: "Chỉnh sửa",
      key: "action",
      render: (_, record) => (
        <Button
          onClick={() => handleUpdate(record)}
          className="bg-orange-500 text-white"
        >
          <InfoCircleOutlined />
        </Button>
      ),
    },
    {
      title: "Ẩn tạm thời",
      key: "disable",
      render: (_, record) => (
        <Switch
          checked={!!record.isAvailable}
          onChange={(checked) => handleToggleAvailability(record._id, checked)}
        />
      ),
    },
  ];

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h2 className="text-lg font-semibold mb-4">Quản lý Phòng</h2>

      <Button type="primary" onClick={showModal} className="mb-4">
        + Thêm Phòng
      </Button>

      <Table columns={columns} dataSource={dataSource} rowKey="_id" />

      <AddRoomModal
        isAddRoomModalOpen={isAddRoomModalOpen}
        handleCancel={handleCancel}
      />
      <UpdateRoomModal
        isUpdateRoomModalOpen={isUpdateRoomModalOpen}
        handleOk={handleOkUpdate}
        handleCancel={handleCancelUpdate}
        room={selectedRecord}
      />
    </div>
  );
};

export default ListRoom;
