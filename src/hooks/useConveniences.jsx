import { useQuery } from "@tanstack/react-query";
import * as ownerService from "../services/owner.service";

const getAllConveniences = async () => {
  try {
    const res = await ownerService.getConevience();
    return res.data;
  } catch (error) {
    console.error("Error fetching conveniences:", error);
    throw new Error("Không thể tải tiện ích.");
  }
};

const useConveniences = () => {
  return useQuery({
    queryKey: ["conveniences"],
    queryFn: getAllConveniences,
  });
};

export default useConveniences;
