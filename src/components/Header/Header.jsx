import React, { useState, useEffect, useMemo, useContext } from "react";
import { Select, Button } from "antd";
import { SearchOutlined, HomeOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import ButtonLogin from "../Button/ButtonLogin";
import ButtonAccount from "../Button/ButtonAccount";
import useCity from "../../hooks/useCity";
import { AuthContext } from "../../contexts/AuthContext";
import Loading from "../Loading/Loading";
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
  const [searchInput, setSearchInput] = useState("");

  const onChange = (value) => {
    setCity(value);
  };

  useEffect(() => {
    setFilteredDestinations(destinations);
  }, [destinations]);

  const handleSearch = (value) => {
    setSearchInput(value);
    setFilteredDestinations(
      destinations.filter((destination) =>
        destination.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSearchSubmit = (value) => {
    const searchValue = value || searchInput;
    if (!searchValue) return;
    navigate(`/search?cityName=${searchValue}`);
    setSearchInput("");
  };
  if (isCityError) {
    return <div>Error loading cities</div>;
  }
  if (isCityLoading) {
    return <p>Loading</p>;
  }
  return (
    <header className="bg-[url('/images/bg.webp')] bg-cover bg-center text-blue-200 px-6 py-6 shadow-lg h-[400px] ">
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

      <div className="mt-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Tìm chỗ nghỉ tiếp theo của bạn
        </h1>
      </div>

      <div className="bg-white p-4 rounded-full mt-8 flex items-center shadow-xl border-2 border-yellow-400 w-[700px] mx-auto gap-4 transform transition-transform duration-300">
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
            onChange={(value) => {
              onChange(value); // giữ logic cũ nếu có
              handleSearchSubmit(value); // gọi tìm kiếm luôn
            }}
            onSearch={handleSearch}
            value={city}
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
          disabled={!city && !searchInput} // disable nếu cả 2 đều rỗng
        >
          <SearchOutlined className="mr-2 text-lg" />
          Tìm kiếm
        </Button>
      </div>
    </header>
  );
};

export default Header;
