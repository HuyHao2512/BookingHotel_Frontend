import React, { useState } from "react";
import LikeCard from "../../components/Card/LikeCard";
import useProperties from "../../hooks/useProperties";

const LikePage = () => {
  const [visibleCount, setVisibleCount] = useState(4); // Hiển thị 4 khách sạn ban đầu
  const {
    data: hotels,
    isLoading: isLoadingHotel,
    isError: isErrorHotel,
  } = useProperties();
  if (isErrorHotel) {
    return <h1>Lỗi: {isErrorHotel.message || "Không thể tải dữ liệu"}</h1>;
  }
  if (isLoadingHotel) {
    return <h1>Đang tải...</h1>;
  }

  return (
    <div className="w-full px-6 mt-6 py-8">
      <div className="max-w-screen-xl mx-auto relative">
        <div className="flex p-6 justify-center">
          <div className="w-3/4 p-4">
            {
              // Hiển thị thông báo nếu không có chỗ nghỉ nào được yêu thích
              hotels && hotels.length === 0 && (
                <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
                  Không có chỗ nghỉ nào được yêu thích.
                </h2>
              )
            }
            {hotels && hotels.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
                  Danh sách chỗ nghỉ yêu thích
                </h2>
                {hotels.slice(0, visibleCount).map((hotel) => (
                  <LikeCard key={hotel._id} hotel={hotel} />
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikePage;
