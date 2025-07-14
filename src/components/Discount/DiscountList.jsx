import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as userService from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import DiscountCard from "./DiscountCard";
const DiscountList = () => {
  const {
    data: discounts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["discountPublic"],
    queryFn: () => userService.getDiscountPublic(),
  });
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

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

  if (isLoading)
    return <p className="text-center text-gray-500">Đang tải...</p>;
  if (isError) return <p>Lỗi khi tải.</p>;
  return (
    <div className="w-full px-6 py-8">
      <div className="max-w-screen-xl mx-auto relative">
        <h2 className="text-xl font-semibold mb-4">Deal hời cho bạn</h2>

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
          {discounts.data
            .filter((discount) => discount.isActive)
            .map((discount, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                <DiscountCard discountData={discount} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DiscountList;
