import React from "react";
import VietnamDestinations from "../../components/Destinations/VietnamDestination";
import SearchByType from "../../components/SearchByType/SearchByType";
import PropertyList from "../../components/Property/PropertyList";
import ForeignDestiantion from "../../components/Destinations/ForeignDestination";
import Explore from "../../components/Home/Explore";
import useCity from "../../hooks/useCity";
import useCategory from "../../hooks/useCategory";
function HomePage() {
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useCategory();
  if (isCategoryLoading) return <p>Đang tải danh mục...</p>;
  if (isCategoryError) return <p>Lỗi khi tải danh mục.</p>;
  return (
    <div>
      <SearchByType
        types={categoryData}
        onSelect={(type) => console.log(type)}
      />
      ;
      <VietnamDestinations />
      <ForeignDestiantion />
      <PropertyList />
      <Explore />
    </div>
  );
}

export default HomePage;
