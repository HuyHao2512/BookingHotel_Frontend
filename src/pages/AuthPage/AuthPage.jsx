import React, { useState } from "react";
import LoginForm from "../../components/Auth/LoginForm";
import SignUpForm from "../../components/Auth/SignUpForm";
import { RollbackOutlined } from "@ant-design/icons";
import { Button } from "antd";
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url(/images/Background_Login.jpg)" }}
    >
      <Button
        className="absolute top-4 left-4"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <RollbackOutlined /> Back to Home
      </Button>
      <div>
        {isLogin ? (
          <LoginForm toggleForm={() => setIsLogin(false)} />
        ) : (
          <SignUpForm toggleForm={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
