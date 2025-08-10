import { Checkbox, Rate } from "antd";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import useAmenities from "../../hooks/useAmenities";

const SidebarFilter = ({ setFilters }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // chỉ chọn 1 category
  const [selectedRate, setSelectedRate] = useState(null);

  const { data: amenities } = useAmenities();
  const { data: categories } = useCategory();

  useEffect(() => {
    const amenitiesFromURL = searchParams.get("amenities")?.split(",") || [];
    const categoryFromURL = searchParams.get("categoryId") || null;
    const rateFromURL = parseInt(searchParams.get("minRate")) || null;

    setSelectedAmenities(amenitiesFromURL);
    setSelectedCategory(categoryFromURL);
    setSelectedRate(rateFromURL);
  }, [searchParams]);

  const applyFilter = (amenities, category, rate) => {
    const params = new URLSearchParams();
    if (amenities.length) params.set("amenities", amenities.join(","));
    if (category) params.set("categoryId", category);
    if (rate) params.set("minRate", rate);
    setSearchParams(params);

    setFilters({
      amenities,
      categoryId: category || undefined,
      minRate: rate || undefined,
    });
  };

  const handleAmenitiesChange = (checked, id) => {
    const newAmenities = checked
      ? [...selectedAmenities, id]
      : selectedAmenities.filter((item) => item !== id);
    const uniqueAmenities = [...new Set(newAmenities)];
    setSelectedAmenities(uniqueAmenities);
    applyFilter(uniqueAmenities, selectedCategory, selectedRate);
  };

  const handleCategoryChange = (checked, id) => {
    const newCategory = checked ? id : null;
    setSelectedCategory(newCategory);
    applyFilter(selectedAmenities, newCategory, selectedRate);
  };

  const handleRateChange = (checked, rate) => {
    const newRate = checked ? rate : null;
    setSelectedRate(newRate);
    applyFilter(selectedAmenities, selectedCategory, newRate);
  };

  return (
    <div className="w-1/4 p-4 bg-white shadow-lg rounded-xl border border-gray-200 max-h-[957px] overflow-y-auto mt-20">
      <h3 className="text-lg font-semibold mb-2">Chọn lọc theo:</h3>

      <div className="mb-4">
        <h4 className="font-semibold">Xếp hạng sao</h4>
        {[5, 4, 3, 2, 1].map((rate) => (
          <label
            key={rate}
            className="flex items-center gap-2 cursor-pointer mb-1"
          >
            <Checkbox
              onChange={(e) => handleRateChange(e.target.checked, rate)}
              checked={selectedRate === rate}
            />
            <Rate disabled defaultValue={rate} />
          </label>
        ))}
      </div>

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
                  handleCategoryChange(e.target.checked, category._id)
                }
                checked={selectedCategory === category._id}
              />
              <span className="text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

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
