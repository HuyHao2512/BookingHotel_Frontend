import { useQuery } from "@tanstack/react-query";
import * as userService from "../services/user.service"; // Import service API

const getAllCities = async () => {
  try {
    const res = await userService.getAllCities();
    return res.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw new Error("Không thể tải thành phố.");
  }
};
const useCity = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: getAllCities,
  });
};

export default useCity;
