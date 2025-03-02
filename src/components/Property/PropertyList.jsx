import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icon
import PropertyCard from "./PropertyCard";

const hotels = [
  {
    id: 1,
    name: "Vinpearl Resort",
    address: "Nha Trang, Việt Nam",
    rate: 5,
    amenities: ["Wifi", "Parking", "Pool", "Gym"],
    images: [
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1739632131/properties/y8liisphnkp8i4ve8okm.jpg",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1739632130/properties/afcza42gr9iz7vb4ezxb.jpg",
      },
    ],
  },
  {
    id: 2,
    name: "Vinpearl Resort",
    address: "Nha Trang, Việt Nam",
    rate: 5,
    amenities: ["Wifi", "Parking", "Pool", "Gym"],
    images: [
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1739632131/properties/y8liisphnkp8i4ve8okm.jpg",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1739632130/properties/afcza42gr9iz7vb4ezxb.jpg",
      },
    ],
  },
  {
    id: 3,
    name: "Vinpearl Resort",
    address: "Nha Trang, Việt Nam",
    rate: 5,
    amenities: ["Wifi", "Parking", "Pool", "Gym"],
    images: [
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1739632131/properties/y8liisphnkp8i4ve8okm.jpg",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1739632130/properties/afcza42gr9iz7vb4ezxb.jpg",
      },
    ],
  },
  {
    id: 4,
    name: "Vinpearl Resort",
    address: "Nha Trang, Việt Nam",
    rate: 5,
    amenities: ["Wifi", "Parking", "Pool", "Gym"],
    images: [
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1739632131/properties/y8liisphnkp8i4ve8okm.jpg",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1739632130/properties/afcza42gr9iz7vb4ezxb.jpg",
      },
    ],
  },
  {
    id: 5,
    name: "Vinpearl Resort",
    address: "Nha Trang, Việt Nam",
    rate: 5,
    amenities: ["Wifi", "Parking", "Pool", "Gym"],
    images: [
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1739632131/properties/y8liisphnkp8i4ve8okm.jpg",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1739632130/properties/afcza42gr9iz7vb4ezxb.jpg",
      },
    ],
  },
  {
    id: 6,
    name: "Vinpearl Resort",
    address: "Nha Trang, Việt Nam",
    rate: 5,
    amenities: ["Wifi", "Parking", "Pool", "Gym"],
    images: [
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1739632131/properties/y8liisphnkp8i4ve8okm.jpg",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1739632130/properties/afcza42gr9iz7vb4ezxb.jpg",
      },
    ],
  },
];

function PropertyList() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (swiperInstance && swiperInstance.params) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

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
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          onSwiper={setSwiperInstance}
        >
          {hotels.map((hotel) => (
            <SwiperSlide key={hotel.id}>
              <PropertyCard hotel={hotel} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default PropertyList;
