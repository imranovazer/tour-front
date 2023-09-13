import { useState, useEffect } from "react";
import cardData from "./statics";
import "./styles/index.scss";
import MyCaorusel from "../../components/ui/Caoursel/MyCaorusel";
import useFetching from "../../hooks/useFetching";
import LandingPageApi from "./api";
import { ContainerLoading } from "../../components/Loading";
import { Tour } from "../../types";
import { BsFlag } from "react-icons/bs";
import { HiOutlineLocationMarker, HiOutlineCalendar } from "react-icons/hi";
import { BsPerson } from "react-icons/bs";
import { motion } from "framer-motion";
import moment from "moment";
import AuthButton from "../../components/ui/AuthButton";
import { useNavigate } from "react-router-dom";
import NewMail from "../../assets/Mail.png";
import { useAppDispatch } from "../../redux/store/hooks";
import { displayAlert } from "../../redux/reducers/alertSlice";
import useLoading from "../../hooks/useLoading";
import AnimatedSection from "./components/AnimatedSection";
//@ts-ignore
const cardVariants = {
  offscreen: {
    opacity: 0,
  },
  onscreen: {
    opacity: 1,
  },
};
function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [content, setContent] = useState<String>();
  const [from, setFrom] = useState<String>();

  const [tours, setTours] = useState<Tour[]>([]);

  const [sendEmail, loadingMail] = useLoading({
    callback: async () => {
      await LandingPageApi.sendEmail({ content, from });
      dispatch(
        displayAlert({ type: true, title: "Message sent successfully" })
      );
    },
    onError: () => {
      dispatch(
        displayAlert({ type: false, title: "Unable to send email tryl later" })
      );
    },
  });
  const handleMailSend = async (e: any) => {
    e.preventDefault();
    sendEmail(null);
  };
  const [getTours, getTourIsLoading] = useFetching(async () => {
    const res = await LandingPageApi.getTopFiveTours();

    setTours(res.data);
  });

  useEffect(() => {
    getTours(null);
  }, []);

  return (
    <>
      <div className="HomeHeader  w-full min-h-screen bg-[url(/src/assets/HeaderWhite.jpg)]  dark:bg-[url(/src/assets/HeaderDark.jpg)] bg-center bg-no-repeat bg-cover  bg-fixed">
        <div className=" container min-h-screen mx-auto flex flex-col px-16 py-[100px] gap-5 justify-around">
          <h1 className="md:text-[60px] md:text-start text-[35px] text-center  p-1 rounded-lg  max-w-[800px] font-bold text-gray-950   dark:text-white">
            Tour around the world with the new destination
          </h1>

          <p className="md:text-[20px] text-[15px]		text-gray-950 rounded-lg dark:text-gray-400 max-w-[500px]">
            We believe in a travelling experience by providing our tour plan
            that suits you best!
          </p>

          <a
            href="#explore"
            className="max-w-[120px] p-2 hover:shadow-xl  cursor-pointer text-white bg-sky-700 dark:bg-orange-600 shadow-sm"
          >
            Explore now
          </a>
        </div>
      </div>
      <section className="w-full  dark:bg-slate-800 bg-slate-200">
        <div className=" container mx-auto px-16 py-16 flex flex-col gap-10">
          <h2 className="text-sky-950 dark:text-white font-bold text-[27px]  md:text-3xl">
            Why to choose us
          </h2>
          <div className="w-full flex-col md:flex-row md:flex-wrap md:grid grid-cols-2 lg:grid-cols-3 justify-items-center items-center flex justify-evenly gap-5">
            {cardData.map((card, index) => (
              <motion.div
                variants={{
                  offscreen: {
                    opacity: 0,
                  },
                  onscreen: {
                    opacity: 1,
                    transition: {
                      duration: index * 1,
                    },
                  },
                }}
                initial={"offscreen"}
                whileInView={"onscreen"}
                viewport={{ once: false, amount: 0.6 }}
                key={index}
                className="rounded-xl  bg-white dark:bg-slate-900 border dark:border-slate-700 p-8 shadow-xl justify-between  w-[300px] min-h-[400px] flex flex-col items-center"
              >
                <img src={card.img} alt="" />
                <h3 className="font-bold dark:text-white">{card.title}</h3>
                <p className="dark:text-white text-center">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <AnimatedSection />
      <section
        className="bg-slate-200 overflow-hidden dark:bg-slate-800  "
        id="explore"
      >
        <div className="TopTourSection py-16 ">
          <div
            className="container px-5  mx-auto   py-16 flex flex-col gap-10 "
            style={{ maxWidth: 1200 }}
          >
            <h2 className="text-black dark:text-white font-bold text-4xl">
              Top 5 tours
            </h2>
            {getTourIsLoading ? (
              <ContainerLoading />
            ) : (
              <MyCaorusel>
                {tours.map((item, index) => (
                  <div
                    key={index}
                    className=" min-h-[600px] flex  relative items-center justify-center"
                  >
                    <img
                      className="w-full h-full object-cover object-center -z-40 absolute  top-0 left-0"
                      src={import.meta.env.VITE_TOUR_IMG_URL + item.imageCover}
                      alt=""
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex-col lg:flex-row flex ">
                      <div className="lg:w-1/2 h-full"></div>
                      <div className="lg:w-1/2 h-full flex justify-end items-end">
                        <div className=" lg:clip-carousel   bg-white/90 dark:text-white dark:bg-slate-800/90 w-full h-full shadow-2xl flex flex-col items-end justify-end gap-10 p-9">
                          <p className="uppercase font-bold text-xl">{`${
                            item.difficulty + " " + item.duration
                          }-DAY TOUR`}</p>

                          <p className="max-w-[240px] text-end text-[17px]">
                            {item.summary}
                          </p>

                          <div className="grid grid-cols-2 w-[300px]  dark:text-white  gap-2">
                            <div className=" flex gap-2 text-[30px] ">
                              <HiOutlineLocationMarker />
                              <span className=" text-[15px] truncate w-[100px]">
                                {item.startLocation.description}
                              </span>
                            </div>
                            <div className=" flex gap-2 text-[30px] ">
                              <HiOutlineCalendar />
                              <span className=" text-[15px]">
                                {moment(item.startDates[0]).format(
                                  "MMMM  YYYY"
                                )}
                              </span>
                            </div>
                            <div className=" flex gap-2 text-[30px] ">
                              <BsFlag />
                              <span className=" text-[15px]">
                                {item.locations.length} stops
                              </span>
                            </div>
                            <div className=" flex gap-2 text-[30px] ">
                              <BsPerson />
                              <span className=" text-[15px]">
                                {item.maxGroupSize} people
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-5">
                            <p className="font-bold text-[20px]">
                              Price : ${item.price}
                            </p>
                            <AuthButton
                              title="Detailed"
                              onClick={() => navigate(`/tours/${item._id}`)}
                            />
                          </div>
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

      <section className="w-full  dark:bg-slate-800 bg-slate-200">
        <div className="container mx-auto py-[100px] px-5 flex flex-col overflow-hidden items-center justify-center">
          <div className="w-full  o shadow-md bg-slate-100 max-w-[800px] h-[500px] p-5 rounded-xl dark:bg-slate-600 relative flex flex-col gap-[30px] items-center">
            <img
              src={NewMail}
              className="absolute w-full max-w-[220px] top-[-80px] right-[-60px]"
              alt="mail"
            />
            <h3 className="font-bold dark:text-white w-full text-[30px]">
              Contact us
            </h3>

            <form className="w-full max-w-[600px]">
              <div>
                <label
                  htmlFor="input-group-1"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>

                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </div>
                  <input
                    onChange={(e) => setFrom(e.target.value)}
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your message
                </label>
                <textarea
                  onChange={(e) => setContent(e.target.value)}
                  id="message"
                  rows={8}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>
              </div>
              <div className="my-5 flex justify-end">
                <AuthButton
                  onClick={handleMailSend}
                  title={loadingMail ? "processing..." : "Send"}
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
