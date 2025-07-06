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
  const token = localStorage.getItem("accessToken");
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

export const bookingRoom = async (data) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.post(`${URL}/booking`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const getAvailableRooms = async (id, checkIn, checkOut) => {
  const res = await instance.get(`/rooms/available-property/${id}`, {
    params: {
      checkIn,
      checkOut,
    },
  });
  return res;
};

export const likeProperty = async (data) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.post(`${URL}/liked`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const getLikedProperties = async (id) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.get(`${URL}/liked/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const getBookingByUser = async (id) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.get(`${URL}/booking/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const review = async (data) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.post(`${URL}/reviews`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const getReviews = async (id) => {
  const res = await instance.get(`/reviews/property/${id}`);
  return res;
};

export const getCodeDiscount = async (code) => {
  const res = await axios.get(`${URL}/discounts/${code}`);
  return res;
};

export const updateActive = async (code, isActive) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.put(`${URL}/discounts/${code}`, isActive, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};
