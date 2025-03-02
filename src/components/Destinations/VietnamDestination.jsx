import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useCitiesOfCountry from "../../hooks/useCitiesOfCountry";

const VietNamDestination = () => {
  const { data: cities, isLoading, isError } = useCitiesOfCountry("Vietnam");
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // ✅ Kiểm tra cities trước khi sử dụng map()
  const destinations = Array.isArray(cities)
    ? cities.map((city) => ({
        name: city.name,
        image: city.image?.url || "fallback-image-url.jpg", // ✅ Kiểm tra tránh lỗi khi không có ảnh
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

  if (isLoading) return <p>Đang tải địa điểm...</p>;
  if (isError) return <p>Lỗi khi tải địa điểm.</p>;
  if (!destinations.length) return <p>Không có dữ liệu.</p>; // ✅ Tránh lỗi khi API trả về rỗng

  return (
    <div className="w-full px-6 py-8">
      <div className="max-w-screen-xl mx-auto relative">
        <h2 className="text-xl font-semibold mb-4">Địa điểm trong nước</h2>

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
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          onSwiper={setSwiperInstance} // Lưu instance của Swiper vào state
        >
          {destinations.map((dest, index) => (
            <SwiperSlide key={index}>
              <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-48 object-cover transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-5 hover:bg-opacity-20 transition duration-300"></div>
                <div className="absolute bottom-2 left-2 flex items-center bg-black bg-opacity-50 text-white px-3 py-1 rounded-md text-sm font-semibold">
                  {dest.name}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default VietNamDestination;
