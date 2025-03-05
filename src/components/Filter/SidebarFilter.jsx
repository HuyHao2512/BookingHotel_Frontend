import { Button, Checkbox, Rate } from "antd";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import useAmenities from "../../hooks/useAmenities";

const SidebarFilter = ({ setFilters }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Trạng thái bộ lọc (state nội bộ)
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRate, setSelectedRate] = useState([]);

  // Fetch dữ liệu từ API
  const { data: amenities } = useAmenities();
  const { data: categories } = useCategory();

  // Đồng bộ state từ URL khi trang tải lại
  useEffect(() => {
    const amenitiesFromURL = searchParams.get("amenities")?.split(",") || [];
    const categoriesFromURL = searchParams.get("categoryId")?.split(",") || [];
    const rateFromURL = parseInt(searchParams.get("minRate")) || null;

    setSelectedAmenities(amenitiesFromURL);
    setSelectedCategories(categoriesFromURL);
    setSelectedRate(rateFromURL ? [rateFromURL] : []);
  }, [searchParams]);

  // Hàm cập nhật checkbox
  const handleCheckboxChange = (checked, id, setState) => {
    setState((prev) => {
      const newState = checked
        ? [...prev, id]
        : prev.filter((item) => item !== id);
      return [...new Set(newState)];
    });
  };

  // Hàm xử lý khi nhấn "Áp dụng" (cập nhật URL và gửi bộ lọc ra ngoài)
  const applyFilter = () => {
    // Cập nhật URL
    const params = new URLSearchParams();
    if (selectedAmenities.length)
      params.set("amenities", selectedAmenities.join(","));
    if (selectedCategories.length)
      params.set("categoryId", selectedCategories.join(","));
    if (selectedRate.length) params.set("minRate", Math.min(...selectedRate));
    setSearchParams(params);

    // Gửi bộ lọc ra ngoài qua setFilters
    setFilters({
      amenities: selectedAmenities,
      categoryId: selectedCategories,
      minRate: selectedRate.length ? Math.min(...selectedRate) : undefined,
    });
  };

  return (
    <div className="w-1/4 p-4 bg-white shadow-lg rounded-xl border border-gray-200 max-h-[957px] overflow-y-auto mt-20">
      <h3 className="text-lg font-semibold mb-2">Chọn lọc theo:</h3>

      {/* Bộ lọc xếp hạng sao */}
      <div className="mb-4">
        <h4 className="font-semibold">Xếp hạng sao</h4>
        {[5, 4, 3, 2, 1].map((rate) => (
          <label
            key={rate}
            className="flex items-center gap-2 cursor-pointer mb-1"
          >
            <Checkbox
              onChange={(e) =>
                handleCheckboxChange(e.target.checked, rate, setSelectedRate)
              }
              checked={selectedRate.includes(rate)}
            />
            <Rate disabled defaultValue={rate} />
          </label>
        ))}
      </div>

      {/* Bộ lọc loại khách sạn */}
      <div className="mb-4">
        <h4 className="font-semibold">Loại khách sạn</h4>
        <div className="flex flex-col gap-2">
          {categories?.map((category) => (
            <label
              key={category._id}
              className="flex items-center gap-2 cursor-pointer mb-1"
            >
              <Checkbox
                onChange={(e) =>
                  handleCheckboxChange(
                    e.target.checked,
                    category._id,
                    setSelectedCategories
                  )
                }
                checked={selectedCategories.includes(category._id)}
              />
              <span className="text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Bộ lọc tiện ích */}
      <div className="mb-4">
        <h4 className="font-semibold">Tiện ích</h4>
        <div className="grid grid-cols-1 gap-2">
          {amenities?.map((amenity) => (
            <label
              key={amenity._id}
              className="flex items-center gap-2 cursor-pointer mb-1"
            >
              <Checkbox
                onChange={(e) =>
                  handleCheckboxChange(
                    e.target.checked,
                    amenity._id,
                    setSelectedAmenities
                  )
                }
                checked={selectedAmenities.includes(amenity._id)}
              />
              <span className="text-gray-700">{amenity.name}</span>
            </label>
          ))}
        </div>
      </div>

      <Button
        type="primary"
        className="w-full mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        onClick={applyFilter}
      >
        Áp dụng
      </Button>
    </div>
  );
};

export default SidebarFilter;
