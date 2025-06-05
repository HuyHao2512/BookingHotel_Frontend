import React from "react";
import VietnamDestinations from "../../components/Destinations/VietnamDestination";
import SearchByType from "../../components/SearchByType/SearchByType";
import PropertyList from "../../components/Property/PropertyList";
import ForeignDestiantion from "../../components/Destinations/ForeignDestination";
import Explore from "../../components/Home/Explore";
import useCategory from "../../hooks/useCategory";
import { FloatButton } from "antd";
function HomePage() {
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useCategory();
  if (isCategoryLoading) return <p>Đang tải danh mục...</p>;
  if (isCategoryError) return <p>Lỗi khi tải danh mục.</p>;
  return (
    <div className="bg-blue-50 min-h-screen">
      <SearchByType
        types={categoryData}
        onSelect={(type) => console.log(type)}
      />
      <VietnamDestinations />
      <ForeignDestiantion />
      <PropertyList />
      <Explore />
      <FloatButton.BackTop visibilityHeight={0} />
    </div>
  );
}

export default HomePage;
