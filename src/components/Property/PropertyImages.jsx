import { useState } from "react";

const PropertyImages = ({ images, handleShowAllImages }) => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-2 relative">
      <div className="col-span-2 row-span-2">
        <img
          src={images[0]?.url}
          alt="Main"
          className="w-full h-[500px] object-cover rounded-lg"
        />
      </div>
      {images.slice(1, 3).map((img, index) => (
        <div key={index} className="w-full h-[246px] relative">
          <img
            src={img.url}
            alt={`Gallery ${index}`}
            className="w-full h-full object-cover rounded-lg"
          />
          {index === 1 && images.length > 3 && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg cursor-pointer"
              onClick={handleShowAllImages}
            >
              <span className="text-white text-xl font-bold">
                +{images.length - 3}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PropertyImages;
