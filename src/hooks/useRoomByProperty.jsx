import { useQuery } from "@tanstack/react-query";
import * as ownerService from "../services/owner.service";

const getRoomByProperty = async (id) => {
  try {
    const response = await ownerService.getRoomByProperty(id);
    return response.data;
  } catch {
    console.error("Lỗi khi lấy danh sách phòng theo ID property");
    throw error;
  }
};

const useRoomByProperty = (id) => {
  return useQuery({
    queryKey: ["roomsbyproperty"],
    queryFn: () => getRoomByProperty(id),
  });
};
export default useRoomByProperty;
