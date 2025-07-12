import { Checkbox, Rate } from "antd";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import useAmenities from "../../hooks/useAmenities";

const SidebarFilter = ({ setFilters }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Trạng thái bộ lọc (state nội bộ)
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRate, setSelectedRate] = useState(null); // Chỉ chọn 1 rate

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
    setSelectedRate(rateFromURL);
  }, [searchParams]);

  // Hàm tự động áp dụng filter
  const applyFilter = (amenities, categories, rate) => {
    // Cập nhật URL
    const params = new URLSearchParams();
    if (amenities.length) params.set("amenities", amenities.join(","));
    if (categories.length) params.set("categoryId", categories.join(","));
    if (rate) params.set("minRate", rate);
    setSearchParams(params);

    // Gửi bộ lọc ra ngoài qua setFilters
    setFilters({
      amenities: amenities,
      categoryId: categories,
      minRate: rate || undefined,
    });
  };

  // Hàm xử lý checkbox amenities
  const handleAmenitiesChange = (checked, id) => {
    const newAmenities = checked
      ? [...selectedAmenities, id]
      : selectedAmenities.filter((item) => item !== id);

    const uniqueAmenities = [...new Set(newAmenities)];
    setSelectedAmenities(uniqueAmenities);

    // Tự động áp dụng filter
    applyFilter(uniqueAmenities, selectedCategories, selectedRate);
  };

  // Hàm xử lý checkbox categories
  const handleCategoriesChange = (checked, id) => {
    const newCategories = checked
      ? [...selectedCategories, id]
      : selectedCategories.filter((item) => item !== id);

    const uniqueCategories = [...new Set(newCategories)];
    setSelectedCategories(uniqueCategories);

    // Tự động áp dụng filter
    applyFilter(selectedAmenities, uniqueCategories, selectedRate);
  };

  // Hàm xử lý checkbox rate (chỉ chọn 1)
  const handleRateChange = (checked, rate) => {
    let newRate;
    if (checked) {
      newRate = rate;
    } else {
      newRate = null;
    }

    setSelectedRate(newRate);

    // Tự động áp dụng filter
    applyFilter(selectedAmenities, selectedCategories, newRate);
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
              onChange={(e) => {
                if (e.target.checked) {
                  handleRateChange(true, rate);
                } else {
                  handleRateChange(false, rate);
                }
              }}
              checked={selectedRate === rate}
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
                  handleCategoriesChange(e.target.checked, category._id)
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
                  handleAmenitiesChange(e.target.checked, amenity._id)
                }
                checked={selectedAmenities.includes(amenity._id)}
              />
              <span className="text-gray-700">{amenity.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
