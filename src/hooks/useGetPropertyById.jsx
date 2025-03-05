import { useQuery } from "@tanstack/react-query";
import * as userService from "../services/user.service"; // Import service API

const getPropertyById = async (id) => {
  try {
    const res = await userService.getOneProperty(id);
    return res.data;
  } catch (error) {
    console.error("Error fetching property:", error);
    throw new Error("Không thể tải chỗ nghỉ.");
  }
};

const useProperty = (id) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => getPropertyById(id),
  });
};

export default useProperty;
