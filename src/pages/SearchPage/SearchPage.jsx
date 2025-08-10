import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Skeleton, Card } from "antd";
import SidebarFilter from "../../components/Filter/SidebarFilter";
import HotelCard from "../../components/Card/HotelCard";
import { useFilteredProperties } from "../../hooks/useFilterProperties";

// Skeleton component cho hotel cards
const HotelCardSkeleton = () => (
  <Card className="mb-4 shadow-md">
    <div className="flex gap-4">
      <Skeleton.Image
        style={{ width: 250, height: 200 }}
        active
        className="rounded-lg"
      />
      <div className="flex-1">
        <Skeleton active paragraph={{ rows: 4 }} />
      </div>
    </div>
  </Card>
);

// Skeleton cho sidebar
const SidebarSkeleton = () => (
  <div className="w-1/4 p-4 bg-white shadow-lg rounded-xl border border-gray-200 max-h-[957px] overflow-y-auto mt-20">
    <Skeleton.Input
      active
      style={{ width: 120, height: 24, marginBottom: 16 }}
    />

    {/* Rating section skeleton */}
    <div className="mb-6">
      <Skeleton.Input
        active
        style={{ width: 100, height: 20, marginBottom: 12 }}
      />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton.Button
              active
              size="small"
              style={{ width: 16, height: 16 }}
            />
            <Skeleton.Input active style={{ width: 100, height: 16 }} />
          </div>
        ))}
      </div>
    </div>

    {/* Category section skeleton */}
    <div className="mb-6">
      <Skeleton.Input
        active
        style={{ width: 80, height: 20, marginBottom: 12 }}
      />
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton.Button
              active
              size="small"
              style={{ width: 16, height: 16 }}
            />
            <Skeleton.Input active style={{ width: 120, height: 16 }} />
          </div>
        ))}
      </div>
    </div>

    {/* Amenities section skeleton */}
    <div className="mb-4">
      <Skeleton.Input
        active
        style={{ width: 60, height: 20, marginBottom: 12 }}
      />
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton.Button
              active
              size="small"
              style={{ width: 16, height: 16 }}
            />
            <Skeleton.Input active style={{ width: 100, height: 16 }} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

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
  const [visibleCount, setVisibleCount] = useState(4);
  const [isPageInitialized, setIsPageInitialized] = useState(false);

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...(categoryId ? { categoryId } : {}),
      ...(cityName ? { cityName } : {}),
    }));

    // Đánh dấu trang đã được khởi tạo sau một khoảng thời gian ngắn
    const timer = setTimeout(() => {
      setIsPageInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
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
    setVisibleCount(4);
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + 4);
  }, []);

  if (isErrorHotel) {
    return (
      <div className="w-full px-6 mt-6 py-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center">
            <h1 className="text-xl text-red-500">
              Lỗi: {isErrorHotel.message || "Không thể tải dữ liệu"}
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 mt-6 py-8">
      <div className="max-w-screen-xl mx-auto relative">
        <div className="flex p-6">
          {/* Sidebar với skeleton loading */}
          {!isPageInitialized ? (
            <SidebarSkeleton />
          ) : (
            <SidebarFilter setFilters={handleFilterChange} />
          )}

          {/* Main content area */}
          <div className="w-3/4 p-4">
            {/* Header với skeleton hoặc loading state */}
            {isLoadingHotel || !isPageInitialized ? (
              <div className="text-center mb-8">
                <Skeleton.Input active style={{ width: 300, height: 32 }} />
              </div>
            ) : (
              <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
                {cityName && hotels?.length > 0
                  ? `${cityName} có ${hotels.length} kết quả`
                  : "Kết quả tìm kiếm"}
              </h2>
            )}

            {/* Hotel cards với skeleton loading */}
            {isLoadingHotel || !isPageInitialized ? (
              <div>
                {Array.from({ length: 4 }).map((_, index) => (
                  <HotelCardSkeleton key={index} />
                ))}
              </div>
            ) : hotels && hotels.length > 0 ? (
              <div>
                {hotels.slice(0, visibleCount).map((hotel) => (
                  <HotelCard key={hotel._id} hotel={hotel} />
                ))}

                {/* Load more button */}
                {visibleCount < hotels.length && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={handleLoadMore}
                      className="px-6 py-3 bg-white text-blue-600 rounded-lg shadow-md hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 border border-orange-500 border-dashed font-medium"
                    >
                      Xem thêm ({hotels.length - visibleCount} còn lại)
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-300 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <h3 className="text-xl font-medium mb-2">
                    Không tìm thấy chỗ nghỉ phù hợp
                  </h3>
                  <p>
                    Thử thay đổi bộ lọc hoặc tìm kiếm khác để có kết quả tốt hơn
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
