import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SidebarFilter from "../../components/Filter/SidebarFilter";
import HotelCard from "../../components/Card/HotelCard";
import { useFilteredProperties } from "../../hooks/useFilterProperties";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const cityName = searchParams.get("cityName");

  const [filters, setFilters] = useState(() => {
    return {
      ...(categoryId ? { categoryId } : {}),
      ...(cityName ? { cityName } : {}),
    };
  });
  const [visibleCount, setVisibleCount] = useState(4); // Hiển thị 4 khách sạn ban đầu
  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...(categoryId ? { categoryId } : {}),
      ...(cityName ? { cityName } : {}),
    }));
  }, [categoryId, cityName]);
  const memoizedFilters = useMemo(() => filters, [filters]);
  const {
    data: hotels,
    isLoading: isLoadingHotel,
    isError: isErrorHotel,
  } = useFilteredProperties(memoizedFilters);
  const handleFilterChange = useCallback((newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
    setVisibleCount(4); // Reset lại số lượng khách sạn hiển thị
  }, []);

  if (isErrorHotel) {
    return <h1>Lỗi: {isErrorHotel.message || "Không thể tải dữ liệu"}</h1>;
  }
  if (isLoadingHotel) {
    return <h1>Đang tải...</h1>;
  }

  return (
    <div className="w-full px-6 mt-6 py-8">
      <div className="max-w-screen-xl mx-auto relative">
        <div className="flex p-6">
          <SidebarFilter setFilters={handleFilterChange} />
          <div className="w-3/4 p-4">
            <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
              {cityName && hotels.length > 0
                ? `${cityName} có ${hotels.length} kết quả`
                : "Kết quả tìm kiếm"}
            </h2>

            {hotels && hotels.length > 0 ? (
              <>
                {hotels.slice(0, visibleCount).map((hotel) => (
                  <HotelCard key={hotel._id} hotel={hotel} />
                ))}

                {/* Nút "Xem thêm" */}
                {visibleCount < hotels.length && (
                  <div className="flex justify-center">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 4)}
                      className="mt-4 px-6 py-2 bg-white-500 text-blue rounded-lg shadow-md hover:bg-orange-300 transition border border-orange-500 border-dashed"
                    >
                      Xem thêm
                    </button>
                  </div>
                )}
              </>
            ) : (
              <h1>Không tìm thấy chỗ nghỉ phù hợp.</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
