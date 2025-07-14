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

export const createCity = async (data) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.post("http://localhost:3000/city/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const updateCity = async (id, data) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.put(`http://localhost:3000/city/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const createAmenity = async (data) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.post("http://localhost:3000/amenities/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const updateAmenity = async (id, data) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.patch(`http://localhost:3000/amenities/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const createConvience = async (data) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.post("http://localhost:3000/conveniences", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const updateConvience = async (id, data) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.patch(
    `http://localhost:3000/conveniences/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};

export const createTypeRoom = async (data) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.post(
    "http://localhost:3000/type-rooms/create",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};

export const updateTypeRoom = async (id, data) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.patch(
    `http://localhost:3000/type-rooms/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};
