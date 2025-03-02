import React, { useState } from "react";
import { DatePicker, Select, Button, Input } from "antd";
import { SearchOutlined, HomeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import ButtonLogin from "../Button/ButtonLogin";
import ButtonAccount from "../Button/ButtonAccount";
const { RangePicker } = DatePicker;
const onChange = (value) => {
  console.log(`selected ${value}`);
};
const destinations = [
  {
    name: "Hà Nội",
    image: "images/ha-noi.jpg",
  },
  {
    name: "Hồ Chí Minh",
    image: "images/ho-chi-minh.jpg",
  },
  {
    name: "Đà Nẵng",
    image: "images/da-nang.jpg",
  },
  {
    name: "Hội An",
    image: "images/hoi-an.jpg",
  },
  {
    name: "Nha Trang",
    image: "images/nha-trang.jpg",
  },
  {
    name: "Đà Lạt",
    image: "images/da-lat.jpg",
  },
];
const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [filteredDestinations, setFilteredDestinations] =
    useState(destinations);

  const handleSearch = (value) => {
    setFilteredDestinations(
      destinations.filter((destination) =>
        destination.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <header className="bg-blue-900 text-white px-6 py-4">
      {/* Top Navigation */}
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src="images/logo.png" alt="logo" className="w-32 ml-24" />
        </Link>
        <div className="flex space-x-3 mr-24">
          {isLogin ? (
            <ButtonAccount />
          ) : (
            <Link to="/login">
              <ButtonLogin label="Đăng nhập" />
            </Link>
          )}
        </div>
      </div>
      <div className="mt-6 text-center">
        <h1 className="text-3xl font-bold">Tìm chỗ nghỉ tiếp theo</h1>
        <p className="text-lg">
          Tìm ưu đãi khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...
        </p>
      </div>
      <div className="bg-white p-3 rounded-full mt-4 flex items-center shadow-md border-2 border-yellow-400 w-[650px] mx-auto gap-2">
        <div className="flex items-center border-r px-4 w-[200px]">
          <HomeOutlined className="mr-2 text-lg text-gray-500" />
          <Select
            showSearch
            placeholder="Chọn địa điểm"
            onChange={onChange}
            onSearch={handleSearch}
            options={filteredDestinations.map((destination) => ({
              value: destination.name,
              label: (
                <div className="flex items-center">
                  <span className="ml-2">{destination.name}</span>
                </div>
              ),
            }))}
          />
        </div>

        {/* Date Picker */}
        <div className="border-r px-4 w-[280px]">
          <RangePicker
            defaultValue={[dayjs(), dayjs().add(1, "day")]}
            format="DD/MM/YYYY"
            className="border-none focus:ring-0 w-full"
          />
        </div>
        {/* Search Button */}
        <Button
          type="primary"
          className="ml-4 flex items-center px-6 rounded-full h-10 w-[120px] justify-center"
        >
          <SearchOutlined className="mr-1" />
          Tìm
        </Button>
      </div>
    </header>
  );
};

export default Header;
