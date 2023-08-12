import React from "react";
import { Image } from "antd";

const MultipleImages: React.FC<{
  images: string[] | undefined;
  cwidth: number | string;
}> = ({ images, cwidth }) => (
  <Image.PreviewGroup
    preview={{
      onChange: (current, prev) =>
        console.log(`current index: ${current}, prev index: ${prev}`),
    }}
  >
    {images?.map((image, index) => (
      <Image
        key={index}
        width={cwidth}
        src={import.meta.env.VITE_TOUR_IMG_URL + image}
      />
    ))}
  </Image.PreviewGroup>
);

export default MultipleImages;
