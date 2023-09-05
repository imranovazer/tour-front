import React, { ReactNode } from "react";
import { Carousel } from "antd";

// const contentStyle: React.CSSProperties = {
//   height: "400px",
//   color: "#fff",
//   lineHeight: "400px",
//   textAlign: "center",
//   background: "#364d79",
// };
interface CouruselPropsType {
  children: ReactNode[];
}

const MyCaorusel: React.FC<CouruselPropsType> = ({ children }) => (
  <Carousel autoplay>{children}</Carousel>
);
// autoplay;

export default MyCaorusel;
