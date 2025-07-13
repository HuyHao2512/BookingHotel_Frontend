import { CopyOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { message } from "antd";
import React from "react";

const DiscountCard = ({ discountData }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(discountData.code);
    message.success("Đã sao chép mã giảm giá!");
  };

  return (
    <div className="max-w-sm bg-white rounded-xl shadow-md p-4 border relative flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="text-blue-500 text-xl">✈️</div>
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              Giảm ngay {discountData.percentage}%
            </h3>
            <p className="text-sm text-gray-500 h-10 clamp-2">
              {discountData.description}
            </p>
          </div>
        </div>
        <InfoCircleOutlined className="text-gray-400 text-lg cursor-pointer" />
      </div>

      {/* Mã giảm giá */}
      <div className="mt-2 flex items-center justify-between border rounded-lg px-3 py-2 bg-gray-50">
        <span className="font-semibold text-gray-700 tracking-wider">
          {discountData.code}
        </span>
        <button
          onClick={handleCopy}
          className="ml-4 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default DiscountCard;
