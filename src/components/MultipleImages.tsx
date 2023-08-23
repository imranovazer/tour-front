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
    <div className="flex flex-col lg:flex-row">
      {images?.map((image, index) => (
        <Image
          key={index}
          width={cwidth}
          src={import.meta.env.VITE_TOUR_IMG_URL + image}
        />
      ))}
    </div>
  </Image.PreviewGroup>
);

export default MultipleImages;
