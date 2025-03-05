import axios from "axios";
import * as userService from "../services/user.service";
import { useQuery } from "@tanstack/react-query";
const getAllProperties = async () => {
  try {
    const res = await userService.getAllProperties();
    return res.data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw new Error("Không thể tải tài sản.");
  }
};
const useProperties = () => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: getAllProperties,
  });
};
export default useProperties;
