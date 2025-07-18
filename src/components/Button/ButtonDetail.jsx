import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd"; // Import message từ Ant Design
import { AuthContext } from "../../contexts/AuthContext";
const ButtonDetail = ({ hotel }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleViewDetail = () => {
    // if (user) {
    if (!hotel || !hotel._id) {
      message.destroy();
      message.error("Lỗi: Không tìm thấy thông tin khách sạn!");
      return;
    }

    navigate(`/property/${hotel._id}`);
    // } else {
    //   message.destroy();
    //   message.error("Vui lòng đăng nhập để xem chi tiết");
    // }
  };

  return (
    <button
      className="ml-4 mt-2 cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
      onClick={handleViewDetail}
    >
      Xem chi tiết
    </button>
  );
};

export default ButtonDetail;
