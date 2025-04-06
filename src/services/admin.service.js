import axios from "axios";

export const getAllUser = async () => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.get("http://localhost:3000/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
