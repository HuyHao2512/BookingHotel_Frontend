import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { message } from "antd";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  const token = params.get("token");
  const userParam = params.get("user");

  let decodedUser = null;
  try {
    decodedUser = JSON.parse(decodeURIComponent(userParam));
  } catch (err) {
    console.error("Failed to decode user param:", err);
  }

  useEffect(() => {
    if (token && decodedUser) {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(decodedUser));

      const userData = jwtDecode(token);
      localStorage.setItem("userId", userData._id); // hoặc _id tùy payload
      localStorage.setItem("email", userData.email);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [token, decodedUser]);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default GoogleCallback;
