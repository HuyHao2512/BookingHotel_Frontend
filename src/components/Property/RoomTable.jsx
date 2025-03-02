import { Table, InputNumber, Button } from "antd";

const RoomTable = ({ rooms, handleQuantityChange, showRoomInfo }) => {
  const columns = [
    {
      title: "Tên Phòng (Nhấp để xem chi tiết)",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Button type="link" onClick={() => showRoomInfo(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: "Chọn Số Lượng",
      key: "selectedQuantity",
      render: (text, record) => (
        <InputNumber
          min={0}
          max={record.quantity}
          value={record.selectedQuantity}
          onChange={(value) => handleQuantityChange(value, record)}
        />
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={rooms}
        columns={columns}
        pagination={{ pageSize: 2 }}
      />
      <Button type="primary">Đặt phòng</Button>
    </div>
  );
};

export default RoomTable;
