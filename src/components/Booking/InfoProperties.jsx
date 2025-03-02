import { EnvironmentOutlined } from "@ant-design/icons";
const InfoProperties = ({ name, location, rating, image }) => {
  return (
    <div className="border p-4 w-[250px] text-xs border-blue-20 border-blue-200">
      <h2 className="text-xl font-semibold mt-2">{name}</h2>
      <p className="text-gray-500">
        <EnvironmentOutlined /> &nbsp;{location}
      </p>
    </div>
  );
};
export default InfoProperties;
