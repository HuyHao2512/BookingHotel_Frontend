import React from "react";
import { Button, notification } from "antd";
import {
  signInWithGoogle,
  signInWithFacebook,
} from "../../pages/AuthPage/firebase";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SocialLoginButtons = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      notification.success({
        message: "Đăng nhập bằng Google thành công!",
      });
      navigate("/home");
    } catch (error) {
      notification.error({
        message: "Đăng nhập bằng Google thất bại",
        description: error.message,
      });
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithFacebook();
      notification.success({
        message: "Đăng nhập bằng Facebook thành công!",
      });
      navigate("/home");
    } catch (error) {
      notification.error({
        message: "Đăng nhập bằng Facebook thất bại",
        description: error.message,
      });
    }
  };

  return (
    <div className="mt-6">
      <Button
        type="default"
        onClick={handleGoogleLogin}
        block
        icon={<FaGoogle className="mr-2 text-xl" />}
        className="mb-3"
      >
        Đăng nhập với Google
      </Button>
      <Button
        type="default"
        onClick={handleFacebookLogin}
        block
        icon={<FaFacebook className="mr-2 text-xl" />}
        className="mb-3"
      >
        Đăng nhập với Facebook
      </Button>
    </div>
  );
};

export default SocialLoginButtons;
