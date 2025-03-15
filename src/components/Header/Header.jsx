import React, { useState, useEffect, useMemo, useContext } from "react";
import { Select, Button } from "antd";
import { SearchOutlined, HomeOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import ButtonLogin from "../Button/ButtonLogin";
import ButtonAccount from "../Button/ButtonAccount";
import useCity from "../../hooks/useCity";
import { AuthContext } from "../../contexts/AuthContext";

const Header = () => {
  const {
    data: cityData,
    isLoading: isCityLoading,
    isError: isCityError,
  } = useCity();
  const destinations = useMemo(() => {
    if (!Array.isArray(cityData)) return [];
    return cityData.map((city) => ({
      name: city.name,
      image: city.image?.url || "images/fallback-image-url.jpg",
    }));
  }, [cityData]);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [city, setCity] = useState("");

  const onChange = (value) => {
    setCity(value);
  };

  useEffect(() => {
    setFilteredDestinations(destinations);
  }, [destinations]);

  const handleSearch = (value) => {
    setFilteredDestinations(
      destinations.filter((destination) =>
        destination.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSearchSubmit = (city) => {
    navigate(`/search?cityName=${city}`);
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-6 py-6 shadow-lg">
      {/* Top Navigation */}
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dsfajbqyx/image/upload/v1741069874/t27rkfzasuv6jnswqjhl.png"
            alt="logo"
            className="w-36 transition-transform duration-300"
          />
        </Link>
        <div className="flex space-x-4">
          {user ? (
            <ButtonAccount />
          ) : (
            <Link to="/login">
              <ButtonLogin label="Đăng nhập" />
            </Link>
          )}
        </div>
      </div>

      {/* Heading */}
      <div className="mt-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Tìm chỗ nghỉ tiếp theo của bạn
        </h1>
        <p className="text-lg mt-2 opacity-90">
          Khám phá ưu đãi khách sạn, nhà nghỉ và nhiều hơn nữa...
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-full mt-8 flex items-center shadow-xl border-2 border-yellow-400 w-[700px] mx-auto gap-4 transform transition-transform duration-300">
        {/* Chọn địa điểm */}
        <div className="flex items-center w-[500px] px-5 border-r border-gray-200">
          <HomeOutlined className="mr-3 text-xl text-gray-600" />
          <Select
            showSearch
            className="w-full border-b-2 border-blue-500 focus:border-blue-700 focus:ring-0"
            placeholder="Chọn địa điểm"
            variant={false}
            inputProps={{
              className: "placeholder-gray-400",
              style: { border: "none" },
            }}
            dropdownStyle={{
              borderRadius: "12px",
              padding: "8px",
              boxShadow: "0 2px 4px 0 rgb(0 0 0 / 20%)",
            }}
            onChange={onChange}
            onSearch={handleSearch}
            loading={isCityLoading}
            options={filteredDestinations.map((destination) => ({
              value: destination.name,
              label: (
                <div className="flex items-center">
                  {/* <HomeOutlined className="text-gray-500 mr-2" /> */}
                  <span className="text-gray-700 font-medium">
                    {destination.name}
                  </span>
                </div>
              ),
            }))}
          />
        </div>

        {/* Nút Tìm kiếm */}
        <Button
          type="primary"
          className="flex items-center px-8 py-2 rounded-full h-12 w-[160px] justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-md"
          onClick={() => handleSearchSubmit(city)}
          disabled={!city}
        >
          <SearchOutlined className="mr-2 text-lg" />
          Tìm kiếm
        </Button>
      </div>
    </header>
  );
};

export default Header;
