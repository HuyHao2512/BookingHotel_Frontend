import axios from "axios";

export const signUpOwner = async (data) => {
  const res = await axios.post("http://localhost:3000/property", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const getAllTypeRoom = async () => {
  const res = await axios.get("http://localhost:3000/type-rooms");
  return res;
};

export const getConevience = async () => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.get("http://localhost:3000/conveniences", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const createRoom = async (data) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.post("http://localhost:3000/rooms", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const findByOwner = async () => {
  const token = localStorage.getItem("accessToken");
  const id = localStorage.getItem("userId");
  const res = await axios.get(`http://localhost:3000/property/owner/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const getRoomByOwner = async (id) => {
  // Nhận trực tiếp id thay vì { id }
  const token = localStorage.getItem("accessToken");
  const res = await axios.get(`http://localhost:3000/rooms/property/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; // Trả về res.data thay vì toàn bộ response
};

export const updateRoom = async (id, data) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.put(`http://localhost:3000/rooms/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const updateRoomStatus = async (roomId, updateData) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.put(
      `http://localhost:3000/rooms/${roomId}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật phòng:", error);
    throw error;
  }
};

export const getRoomByProperty = async (id) => {
  const res = await axios.get(`http://localhost:3000/rooms/property/${id}`);
  return res;
};

export const getBookingByProperty = async (id) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.get(`http://localhost:3000/booking/property/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const updateBookingStatus = async (id, status) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.patch(
    `http://localhost:3000/booking/status/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const releaseRoom = async (id) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.patch(
    `http://localhost:3000/booking/release-room/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};
