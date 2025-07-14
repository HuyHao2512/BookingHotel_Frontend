import { useQuery } from "@tanstack/react-query";
import * as userService from "../services/user.service"; // Import service API

const getAllBanner = async () => {
  try {
    const res = await userService.getAllBanners();
    return res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Không thể tải danh mục.");
  }
};
const useBanner = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: getAllBanner,
  });
};

export default useBanner;
