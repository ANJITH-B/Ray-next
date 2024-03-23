import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
const LoadingSpinner = ({ size = 24, color = "white" }) => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: size,
        color: color,
      }}
      spin
    />
  );
  return <Spin indicator={antIcon} />;
};

export default LoadingSpinner;
