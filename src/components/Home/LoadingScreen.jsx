import React from "react";
import { Spin } from "antd";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-[1000]">
      <Spin size="large" />
    </div>
  );
};

export default LoadingScreen;
