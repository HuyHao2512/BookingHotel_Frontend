import { useQuery } from "@tanstack/react-query";
import * as userService from "../services/user.service";

const useCitiesOfCountry = (country) => {
  return useQuery({
    queryKey: ["cities", country], // ✅ Query key chứa country để cache theo từng quốc gia
    queryFn: () => userService.getCityOfCountry(country), // ✅ Gọi từ service
    enabled: !!country, // ✅ Chỉ fetch khi có country
    staleTime: 5 * 60 * 1000, // ⚡ Giữ cache trong 5 phút để tránh gọi lại API không cần thiết
  });
};

export default useCitiesOfCountry;
