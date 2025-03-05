import { useQuery } from "@tanstack/react-query";
import * as userService from "../services/user.service";

const getFilterProperties = async ({
  cityName,
  cityId,
  amenities,
  categoryId,
  minRate,
}) => {
  try {
    const res = await userService.getFilteredProperties(
      cityName,
      cityId,
      amenities,
      categoryId,
      minRate
    );
    return res.data; // Đảm bảo rằng res.data là một mảng
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw new Error("Không thể tải chỗ nghỉ.");
  }
};

export const useFilteredProperties = (filters) => {
  return useQuery({
    queryKey: ["filterProperties", filters],
    queryFn: () => getFilterProperties(filters),
    enabled: !!filters,
  });
};
