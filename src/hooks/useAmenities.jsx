import { useQuery } from "@tanstack/react-query";
import * as userService from "../services/user.service"; // Import service API

const getAllAmenities = async () => {
  try {
    const res = await userService.getAllAmenities();
    return res.data;
  } catch (error) {
    console.error("Error fetching amenities:", error);
    throw new Error("Không thể tải tiện ích.");
  }
};

const useAmenities = () => {
  return useQuery({
    queryKey: ["amenities"],
    queryFn: getAllAmenities,
  });
};

export default useAmenities;
