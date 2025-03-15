import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icon
import PropertyCard from "./PropertyCard";
import useProperties from "../../hooks/useProperties";

function PropertyList() {
  const { data: hotelsData, isLoading, isError } = useProperties();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const hotels = Array.isArray(hotelsData)
    ? hotelsData.map((hotel) => ({
        _id: hotel?._id || "",
        name: hotel?.name || "Chưa có tên",
        image: hotel?.images?.[0]?.url || "fallback-image-url.jpg",
        rate: hotel?.rate ?? "Chưa có đánh giá",
        address: hotel?.address || "Không có địa chỉ",
      }))
    : [];
  useEffect(() => {
    if (
      swiperInstance &&
      swiperInstance.navigation &&
      prevRef.current &&
      nextRef.current
    ) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);
  if (isLoading) return <p>Đang tải chỗ nghỉ...</p>;
  if (isError) return <p>Lỗi khi tải chỗ nghỉ.</p>;
  if (!hotels.length) return <p>Không có dữ liệu.</p>;
  return (
    <div className="w-full px-6 mt-6 py-8">
      <div className="max-w-screen-xl mx-auto relative">
        <h2 className="text-2xl font-semibold mb-4">
          Lưu trú tại các chỗ nghỉ độc đáo hàng đầu
        </h2>
        <h3 className="text-gray-500 mb-6">
          Từ biệt thự, lâu đài cho đến nhà thuyền, igloo, chúng tôi đều có hết
        </h3>
        {/* Nút Mũi Tên */}
        <button
          ref={prevRef}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2"
        >
          <ChevronLeft
            size={24}
            className="text-gray-700 hover:text-black transition duration-200"
          />
        </button>

        <button
          ref={nextRef}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2"
        >
          <ChevronRight
            size={24}
            className="text-gray-700 hover:text-black transition duration-200"
          />
        </button>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          onSwiper={setSwiperInstance}
        >
          {hotels.map((hotel) => (
            <SwiperSlide key={hotel._id}>
              <PropertyCard hotel={hotel} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default PropertyList;
