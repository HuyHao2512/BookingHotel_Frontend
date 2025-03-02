import axios from "axios";
const URL = "http://localhost:3000";
const instance = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllAmenities = async () => {
  const res = await instance.get("/amenities");
  return res;
};
export const getAllCategories = async () => {
  const res = await instance.get("/category");
  return res;
};
export const getAllCities = async () => {
  const res = await instance.get("/city");
  return res;
};
export const getCityOfCountry = async (country) => {
  const res = await instance.get(`/city/country`, {
    params: { name: country }, // ✅ Truyền country vào query params
  });
  return res.data;
};
