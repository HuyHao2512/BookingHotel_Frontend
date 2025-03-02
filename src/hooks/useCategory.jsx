import { useQuery } from "@tanstack/react-query";
import * as userService from "../services/user.service"; // Import service API

const getAllCategories = async () => {
  try {
    const res = await userService.getAllCategories();
    return res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Không thể tải danh mục.");
  }
};
const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};

export default useCategory;
