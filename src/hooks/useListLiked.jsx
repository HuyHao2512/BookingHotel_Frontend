import { useQuery } from "@tanstack/react-query";
import * as userServices from "../services/user.service";

const getLikedProperties = async (id) => {
  const res = await userServices.getLikedProperties(id);
  return res.data;
};

const useListLiked = (id) => {
  return useQuery({
    queryKey: ["liked", id],
    queryFn: () => getLikedProperties(id),
  });
};
export default useListLiked;
