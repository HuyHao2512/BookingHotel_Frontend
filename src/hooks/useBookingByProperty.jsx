import { useQuery } from "@tanstack/react-query";
import * as ownerService from "../services/owner.service";

const getBookingByProperty = async (id) => {
  try {
    const res = await ownerService.getBookingByProperty(id);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

const useBookingByProperty = (id) => {
  return useQuery({
    queryKey: ["booking-property", id],
    queryFn: () => getBookingByProperty(id),
  });
};
export default useBookingByProperty;
