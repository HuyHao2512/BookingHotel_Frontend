import { useState, useEffect } from "react";
import {
  FaHotel,
  FaHome,
  FaUmbrellaBeach,
  FaBuilding,
  FaBed,
  FaHouseUser,
} from "react-icons/fa";

// Hàm xáo trộn mảng (Fisher-Yates Shuffle)
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function SearchByType({ types, onSelect }) {
  const [selectedType, setSelectedType] = useState(null);
  const [typeIcons, setTypeIcons] = useState({});

  useEffect(() => {
    const shuffledIcons = shuffleArray([
      FaHotel,
      FaHome,
      FaUmbrellaBeach,
      FaBuilding,
      FaBed,
      FaHouseUser,
    ]);
    const assignedIcons = {};

    types.forEach((type, index) => {
      assignedIcons[type.name] = shuffledIcons[index % shuffledIcons.length]; // Không trùng icon
    });

    setTypeIcons(assignedIcons);
  }, [types]);

  const handleSelect = (type) => {
    setSelectedType(type);
    if (onSelect) onSelect(type);
  };

  return (
    <div className="w-full px-6 py-8">
      <div className="max-w-screen-xl mx-auto relative">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          🔍 Tìm kiếm theo loại chỗ ở
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {types.map((type) => {
            const Icon = typeIcons[type.name];
            return (
              <button
                key={type.name}
                onClick={() => handleSelect(type.name)}
                className={`flex flex-col items-center justify-center p-5 rounded-xl shadow-md transition-all duration-300 transform ${
                  selectedType === type.name
                    ? "bg-blue-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-800 hover:bg-blue-100 hover:scale-105"
                }`}
              >
                {Icon && (
                  <Icon
                    className={`text-3xl ${
                      selectedType === type.name
                        ? "text-white"
                        : "text-blue-500"
                    }`}
                  />
                )}
                <span className="mt-2 text-lg font-semibold">{type.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
