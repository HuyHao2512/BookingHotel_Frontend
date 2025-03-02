import { Tag } from "antd";

const PropertyAmenities = ({ amenities }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {amenities.map((amenity, index) => (
        <Tag
          key={index}
          color="blue"
          style={{ fontSize: "1rem", padding: "6px 8px" }}
        >
          {amenity.name}
        </Tag>
      ))}
    </div>
  );
};

export default PropertyAmenities;
