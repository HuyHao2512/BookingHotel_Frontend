import React from "react";
import { FaTrash } from "react-icons/fa";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
      {/* Hình ảnh sản phẩm */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />

      {/* Thông tin sản phẩm */}
      <div className="flex-1 ml-4">
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p className="text-gray-500">{item.price.toLocaleString()} VND</p>

        {/* Chỉnh số lượng */}
        <div className="flex items-center mt-2">
          <button
            className="px-2 py-1 border rounded-lg"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="mx-3">{item.quantity}</span>
          <button
            className="px-2 py-1 border rounded-lg"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Xóa sản phẩm */}
      <button onClick={() => onRemove(item.id)} className="text-red-600">
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
