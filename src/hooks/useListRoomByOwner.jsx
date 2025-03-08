import { useQuery } from "@tanstack/react-query";
import * as ownerService from "../services/owner.service";

const findRoomByOwner = async (id) => {
  try {
    return await ownerService.getRoomByOwner(id);
  } catch (error) {
    console.error("Error fetching owner:", error);
    throw new Error("Không thể tải thông tin chủ nhà.");
  }
};

const useListRoomByOwner = (id) => {
  return useQuery({
    queryKey: ["owner", id],
    queryFn: () => findRoomByOwner(id),
    enabled: !!id,
  });
};

export default useListRoomByOwner;
