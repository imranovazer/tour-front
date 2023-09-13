// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { Review } from "../../../types";
import { Rate } from "antd";

export default function MySwiper({ slides }: { slides: Review[] | undefined }) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        navigation={false}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
            navigation: true,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
            navigation: true,
          },
        }}
        pagination={{
          // clickable: true,
          dynamicBullets: true,
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {slides?.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div className="w-full flex justify-center mb-10">
              <div className="w-[300px] min-h-[400px] text-black bg-slate-100 shadow-xl dark:bg-slate-700 p-5 rounded-xl flex flex-col  gap-5 items-center">
                <Rate
                  disabled
                  defaultValue={slide.rating}
                  className="text-sky-600 "
                />
                <div className="w-[120px] rounded-full overflow-hidden border-4 ">
                  <img
                    className="w-full"
                    src={`${
                      import.meta.env.VITE_USER_IMG_URL + slide.user.photo
                    }`}
                    alt="user"
                  />
                </div>
                <p className="dark:text-white"> {slide.user.name}</p>
                <p className="dark:text-white text-center"> {slide.review}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
