import React from "react";
import useBanner from "../../hooks/useBanner";
const Explore = () => {
  const { data: banners, isLoading, error } = useBanner();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <div className="w-full px-6">
        <div className="max-w-screen-xl mx-auto relative">
          <div>
            {banners?.map((banner) => (
              <div key={banner.id} className="pt-12">
                <h2 className="text-xl font-semibold">{banner.title}</h2>
                <h3 className="text-lg text-gray-500 font-semibold">
                  {banner.description}
                </h3>
                <img
                  src={banner.image.url}
                  alt={banner.title}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
