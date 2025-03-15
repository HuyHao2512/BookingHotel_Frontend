import { useQuery } from "@tanstack/react-query";
import * as userService from "../services/user.service";
///
const getBookingByUser = async (id) => {
  try {
    const res = await userService.getBookingByUser(id);
    return res.data;
  } catch (err) {
    throw new Error(err);
    console.log(err);
  }
};

const useBookingByUser = (id) => {
  return useQuery({
    queryKey: ["booking-user", id],
    queryFn: () => getBookingByUser(id),
  });
};
export default useBookingByUser;
