import React from "react";
import SidebarFilter from "../../components/Filter/SidebarFilter";
import HotelCard from "../../components/Card/HotelCard";
import ButtonFilter from "../../components/Button/ButtonFilter";
const hotels = [
  {
    _id: "67b7091caf8b0940ad8a30b4",
    name: "test 111112",
    owner: "6791d10789471702c8a6f259",
    category: {
      _id: "6791c0c62237534d54e58bf1",
      name: "Khách sạn",
      description: "des",
      __v: 0,
    },
    city: {
      _id: "67b0a936af1c12cac8479734",
      name: "Hà Nội",
      image: {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1739630902/cities/hri7obsm4eqdtyn5rm6y.jpg",
        publicId: "cities/hri7obsm4eqdtyn5rm6y",
      },
      country: "Vietnam",
      __v: 0,
    },
    amenities: [
      {
        _id: "67b0a553af1c12cac8479723",
        name: "Quầy bar",
        __v: 0,
      },
      {
        _id: "67b6dcfa4b0bbffca3f45496",
        name: "Test",
        __v: 0,
      },
    ],
    address: "26 Phat Loc, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
    email: "owner@gmail.com",
    phone: "0123456789",
    description:
      "Pilgrimage Village Boutique Resort & Spa là resort mộc mạc...\n\nTại đây, du khách có thể lựa chọn trong số các bungalow...\n",
    rate: 5,
    images: [
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1740048663/properties/j9jiz6mt8i4v557008rr.jpg",
        publicId: "properties/j9jiz6mt8i4v557008rr",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1740048664/properties/vnkwyuy2oryctxfgiwgn.jpg",
        publicId: "properties/vnkwyuy2oryctxfgiwgn",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1740048665/properties/k2kgirt5oylfd712zf5y.jpg",
        publicId: "properties/k2kgirt5oylfd712zf5y",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1740048666/properties/eenhtqtffbaksrmezhus.jpg",
        publicId: "properties/eenhtqtffbaksrmezhus",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1740048667/properties/k7fqbneui5nmkhvm7zbg.jpg",
        publicId: "properties/k7fqbneui5nmkhvm7zbg",
      },
      {
        url: "https://res.cloudinary.com/dsfajbqyx/image/upload/v1740048668/properties/y4jch4wluw6dsc0iidng.jpg",
        publicId: "properties/y4jch4wluw6dsc0iidng",
      },
    ],
    createdAt: "2025-02-20T10:51:09.007Z",
    updatedAt: "2025-02-20T10:51:09.007Z",
    __v: 0,
  },
];

const amenities = [
  {
    id: 1,
    name: "Wifi",
  },
  {
    id: 2,
    name: "Parking",
  },
  {
    id: 3,
    name: "Pool",
  },
  {
    id: 4,
    name: "Gym",
  },
  {
    id: 5,
    name: "Restaurant",
  },
  {
    id: 6,
    name: "Bar",
  },
  {
    id: 7,
    name: "Spa",
  },
  {
    id: 8,
    name: "Pet Friendly",
  },
  {
    id: 9,
    name: "Beach",
  },
  {
    id: 10,
    name: "Airport Shuttle",
  },
  {
    id: 11,
    name: "Childcare",
  },
  {
    id: 12,
    name: "Kitchen",
  },
  {
    id: 13,
    name: "Breakfast",
  },
  {
    id: 14,
    name: "AC",
  },
  {
    id: 15,
    name: "TV",
  },
  {
    id: 16,
    name: "Washer",
  },
  {
    id: 17,
    name: "Dryer",
  },
  {
    id: 18,
    name: "Iron",
  },
  {
    id: 19,
    name: "Hair Dryer",
  },
  {
    id: 20,
    name: "Coffee Maker",
  },
];
const categories = [
  {
    id: 1,
    name: "Khách sạn",
  },
  {
    id: 2,
    name: "Nhà nghỉ",
  },
  {
    id: 3,
    name: "Homestay",
  },
  {
    id: 4,
    name: "Resort",
  },
  {
    id: 5,
    name: "Villa",
  },
];

const SearchPage = () => {
  return (
    <div className="w-full px-6 mt-6 py-8">
      <div className="max-w-screen-xl mx-auto relative">
        <div className="flex p-6">
          <SidebarFilter amenities={amenities} categories={categories} />
          <div className="w-3/4 p-4">
            <h1 className="text-2xl font-bold ">
              Hà Nội: tìm thấy {hotels.length} chỗ nghỉ
            </h1>
            {hotels.map((hotel, index) => (
              <HotelCard key={index} hotel={hotel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
