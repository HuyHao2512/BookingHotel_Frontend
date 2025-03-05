import { Tag } from "antd";

const PropertyAmenities = ({ amenities }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {amenities.map((amenity, index) => (
        <Tag
          key={index}
          color="purple"
          className="px-3 py-1 rounded-full text-white font-semibold shadow-md transition-transform hover:scale-105 text-sm"
        >
          {amenity.name}
        </Tag>
      ))}
    </div>
  );
};

export default PropertyAmenities;
