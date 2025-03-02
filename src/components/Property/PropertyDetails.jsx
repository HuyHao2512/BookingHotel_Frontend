import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { Typography } from "antd";

const { Title } = Typography;

const PropertyDetails = ({ property }) => {
  return (
    <div className="max-w-3xl mb-4 mt-4">
      <div className="flex items-center gap-2">
        <div className="flex text-yellow-400 text-lg">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
      </div>

      <Title level={3} className="mt-2">
        {property.name}
      </Title>

      <div className="flex items-center text-gray-700 mt-1">
        <FaMapMarkerAlt className="text-blue-500" />
        <span className="ml-1">{property.address}</span>
      </div>
    </div>
  );
};

export default PropertyDetails;
