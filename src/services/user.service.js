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
export const getAllProperties = async () => {
  const res = await instance.get("/property");
  return res;
};

export const getOneProperty = async (id) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiX2lkIjoiNjdiMzYwODY5MjcwNTk4ODkwYjMzYjQ2Iiwicm9sZXMiOlsidXNlciJdLCJpYXQiOjE3NDA5OTYyODAsImV4cCI6MjAwMDE5NjI4MH0.o3wYPaGPufgDsFSXvGMvy_a-tBDLBs0z-AQwAjS5lvA";
  const res = await axios.get(`${URL}/property/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const getFilteredProperties = async (
  cityName,
  cityId,
  amenities,
  categoryId,
  minRate
) => {
  const res = await instance.get("/property/filter", {
    params: {
      cityName,
      cityId,
      amenities,
      categoryId,
      minRate,
    },
  });
  return res;
};
