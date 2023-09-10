import "../style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import companies from "../data/data";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const ComplanySlider = () => {
  return (
    <div className="CompanySlider">
      <div className="container mx-auto">
        <Swiper
          //slidesPerView={3}
          centeredSlides={true}
          spaceBetween={10}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {companies.map((e: string) => (
            <SwiperSlide>
              <img src={e} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ComplanySlider;
