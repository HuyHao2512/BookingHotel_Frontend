import { useQuery } from "@tanstack/react-query";
import * as ownerService from "../services/owner.service";

const findByOwner = async () => {
  try {
    const res = await ownerService.findByOwner();
    return res;
  } catch (error) {
    console.error("Error fetching owner:", error);
    throw new Error("Không thể tải thông tin chủ nhà.");
  }
};
const useFindByOwner = () => {
  return useQuery({
    queryKey: ["owner"],
    queryFn: findByOwner,
  });
};
export default useFindByOwner;
