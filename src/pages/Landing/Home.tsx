import { useState, useEffect } from "react";
import cardData from "./statics";
import "./styles/index.scss";
import MyCaorusel from "../../components/ui/Caoursel/MyCaorusel";
import useFetching from "../../hooks/useFetching";
import LandingPageApi from "./api";
import { ContainerLoading } from "../../components/Loading";
import { Tour } from "../../types";

function Home() {
  const [tours, setTours] = useState<Tour[]>([]);

  const [getTours, getTourIsLoading] = useFetching(async () => {
    const res = await LandingPageApi.getTopFiveTours();

    setTours(res.data);
  });

  useEffect(() => {
    getTours(null);
  }, []);

  return (
    <>
      <div className="w-full min-h-screen bg-[url(/src/assets/HeaderWhite.jpg)]  dark:bg-[url(/src/assets/HeaderDark.jpeg)] bg-center bg-no-repeat bg-cover  bg-fixed">
        <div className=" container min-h-screen mx-auto flex flex-col px-16 py-[100px] gap-5 justify-around">
          <h1 className="text-[60px] backdrop-blur-sm p-1 rounded-lg  max-w-[800px] font-bold  text-sky-600 dark:text-white">
            Tour around the world with the new destination
          </h1>

          <p className="text-[20px]   backdrop-blur-xl p-1		text-white rounded-lg dark:text-gray-400 max-w-[500px]">
            We believe in a travelling experience by providing our tour plan
            that suits you best!
          </p>

          <button className="max-w-[120px] p-2  text-white bg-sky-700 dark:bg-orange-600 shadow-sm">
            Explore now
          </button>
        </div>
      </div>
      <section className="w-full  dark:bg-slate-800 bg-slate-200">
        <div className=" container mx-auto px-16 py-16 flex flex-col gap-10">
          <h2 className="text-sky-950 dark:text-white font-bold text-3xl">
            Why to choose us
          </h2>
          <div className="w-full flex-col md:flex-row md:flex-wrap md:grid grid-cols-2 lg:grid-cols-3 justify-items-center items-center flex justify-evenly gap-5">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="rounded-xl  bg-white dark:bg-slate-900 border dark:border-slate-700 p-8 shadow-xl justify-between  w-[300px] min-h-[400px] flex flex-col items-center"
              >
                <img src={card.img} alt="" />
                <h3 className="font-bold dark:text-white">{card.title}</h3>
                <p className="dark:text-white text-center">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-slate-200 overflow-hidden dark:bg-slate-800  ">
        <div className="TopTourSection py-16 ">
          <div className="container mx-auto px-16 py-16 flex flex-col gap-5 ">
            <h2 className="text-black dark:text-white font-bold text-3xl">
              Top 5 tours
            </h2>
            {getTourIsLoading ? (
              <ContainerLoading />
            ) : (
              <MyCaorusel>
                {tours.map((item, index) => (
                  <div
                    key={index}
                    className=" min-h-[600px] flex relative items-center justify-center"
                  >
                    <img
                      className="w-full h-full object-cover object-center -z-40 absolute  top-0 left-0"
                      src={import.meta.env.VITE_TOUR_IMG_URL + item.imageCover}
                      alt=""
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex ">
                      <div className="w-1/2 h-full"></div>
                      <div className="w-1/2 h-full flex justify-end items-end">
                        <div className="clipTourSlide bg-white/90 dark:text-white dark:bg-slate-800/90 w-full h-full shadow-2xl flex flex-col items-end gap-4 p-9">
                          <p className="uppercase font-bold text-xl">{`${
                            item.difficulty + " " + item.duration
                          }-DAY TOUR`}</p>

                          <p className="max-w-[220px] text-end">
                            {item.summary}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </MyCaorusel>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
