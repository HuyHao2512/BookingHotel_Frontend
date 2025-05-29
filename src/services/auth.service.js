import axios from "axios";
const URL = "http://localhost:3000";
const instance = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data) => {
  const res = await instance.post("/auth/login", data); // Chỉ dùng endpoint, không nối URL
  return res;
};

export const register = async (data) => {
  const res = await instance.post("/auth/register", data);
  return res;
};

export const logout = async ({ refreshToken }) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.post(
    `${URL}/auth/logout`,
    { refreshToken },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};
export const loginGoogle = () => {
  window.open("http://localhost:3000/auth/google"); // Mở tab mới
};
