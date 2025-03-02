import { Button, Checkbox, Rate } from "antd";
import React, { useState } from "react";

const SidebarFilter = ({ amenities = [], categories = [], onFilterChange }) => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRate, setSelectedRate] = useState(() => []); // Luôn là mảng rỗng

  // Xử lý chọn amenities
  const handleAmenityChange = (checked, name) => {
    setSelectedAmenities((prev) =>
      checked ? [...prev, name] : prev.filter((item) => item !== name)
    );
  };

  // Xử lý chọn loại khách sạn
  const handleCategoryChange = (checked, name) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, name] : prev.filter((item) => item !== name)
    );
  };

  // Xử lý chọn rating (Checkbox)
  const handleRateChange = (checked, value) => {
    setSelectedRate((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  // Áp dụng filter
  const applyFilter = () => {
    onFilterChange({
      amenities: selectedAmenities,
      categories: selectedCategories,
      rate: selectedRate,
    });
  };

  return (
    <div className="w-1/4 p-4 bg-white shadow-lg rounded-xl border border-gray-200">
      <h3 className="text-lg font-semibold mb-2">Chọn lọc theo:</h3>

      {/* Bộ lọc theo số sao (Checkbox) */}
      <div className="mb-4">
        <h4 className="font-semibold">Xếp hạng sao</h4>
        {[5, 4, 3, 2, 1].map((rate) => (
          <label key={rate} className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              onChange={(e) => handleRateChange(e.target.checked, rate)}
              checked={
                Array.isArray(selectedRate) && selectedRate.includes(rate)
              }
            />
            <Rate disabled defaultValue={rate} />
          </label>
        ))}
      </div>
      {/* Bộ lọc theo loại khách sạn */}
      <div className="mb-4">
        <h4 className="font-semibold">Loại khách sạn</h4>
        <div className="flex flex-col gap-2">
          {categories?.length > 0 &&
            categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox
                  onChange={(e) =>
                    handleCategoryChange(e.target.checked, category.name)
                  }
                />
                <span className="text-gray-700">{category.name}</span>
              </label>
            ))}
        </div>
      </div>

      {/* Bộ lọc theo tiện ích */}
      <div className="mb-4">
        <h4 className="font-semibold">Tiện ích</h4>
        <div className="grid grid-cols-2 gap-2">
          {amenities?.length > 0 &&
            amenities.map((amenity) => (
              <label
                key={amenity.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox
                  onChange={(e) =>
                    handleAmenityChange(e.target.checked, amenity.name)
                  }
                />
                <span className="text-gray-700">{amenity.name}</span>
              </label>
            ))}
        </div>
      </div>

      <Button type="primary" className="w-full mt-4" onClick={applyFilter}>
        Áp dụng
      </Button>
    </div>
  );
};

export default SidebarFilter;
