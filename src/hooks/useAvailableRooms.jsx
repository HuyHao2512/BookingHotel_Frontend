import { useQuery } from "@tanstack/react-query";
import * as userService from "../services/user.service";

const getAvailableRooms = async (id, propertyId, checkIn, checkOut) => {
  try {
    const res = await userService.getAvailableRooms(
      id,
      propertyId,
      checkIn,
      checkOut
    );
    return res.data;
  } catch {
    throw new Error("Error");
    console.log("Error");
  }
};

const useAvailableRooms = (id, checkIn, checkOut) => {
  return useQuery({
    queryKey: ["availableRooms", id, checkIn, checkOut],
    queryFn: () => getAvailableRooms(id, checkIn, checkOut),
  });
};

export default useAvailableRooms;
