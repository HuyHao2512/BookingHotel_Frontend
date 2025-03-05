import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icon
import useCitiesOfCountry from "../../hooks/useCitiesOfCountry";
import { useNavigate } from "react-router-dom";
const ForeignDestination = () => {
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const { data: cities, isLoading, isError } = useCitiesOfCountry("Foreign");
  const destinations = Array.isArray(cities)
    ? cities.map((city) => ({
        name: city.name,
        image: city.image?.url || "fallback-image-url.jpg", // ✅ Kiểm tra tránh lỗi khi không có ảnh
      }))
    : [];
  useEffect(() => {
    if (swiperInstance && swiperInstance.params) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  const handleChoiceCity = (dest) => {
    navigate(`/search?cityName=${dest.name}`);
  };
  return (
    <div className="w-full px-6 py-8">
      <div className="max-w-screen-xl mx-auto relative">
        <h2 className="text-xl font-semibold mb-4">Địa điểm nước ngoài</h2>

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
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          onSwiper={setSwiperInstance} // Lưu instance của Swiper vào state
        >
          {destinations.map((dest, index) => (
            <SwiperSlide
              onClick={() => handleChoiceCity(dest)}
              key={index}
              className="cursor-pointer"
            >
              <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-5 hover:bg-opacity-20 transition"></div>
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

export default ForeignDestination;
