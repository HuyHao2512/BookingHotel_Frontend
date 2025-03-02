import axios from "axios";

export const signUpOwner = async (data) => {
  const res = await axios.post("http://localhost:3000/property", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};
