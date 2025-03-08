import { useQuery } from "@tanstack/react-query";
import * as ownerService from "../services/owner.service";

const getAllTypeRoom = async () => {
  try {
    const res = await ownerService.getAllTypeRoom();
    return res.data;
  } catch (error) {
    console.error("Error fetching type room:", error);
    throw new Error("Không thể tải loại phòng.");
  }
};

const useTypeRoom = () => {
  return useQuery({
    queryKey: ["type-room"],
    queryFn: getAllTypeRoom,
  });
};
export default useTypeRoom;
