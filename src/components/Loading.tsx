import React from "react";
import { Space, Spin } from "antd";

const Loading: React.FC = () => (
  <div className="w-full h-screen flex items-center justify-center text-black">
    <Space size="middle">
      <Spin size="large" tip="Loading..." />
    </Space>
  </div>
);

export const ContainerLoading: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center ">
    <Space size="middle">
      <Spin size="large" tip="Loading..." />
    </Space>
  </div>
);

export default Loading;
