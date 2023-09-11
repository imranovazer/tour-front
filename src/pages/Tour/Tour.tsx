import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TourApi from "./api";
import Loading from "../../components/Loading";
import useFetching from "../../hooks/useFetching";
import { Location, Review, Tour } from "../../types";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
// import { WebMercatorViewport } from "viewport-mercator-project";
import "mapbox-gl/dist/mapbox-gl.css";
import { IoLocationSharp } from "react-icons/io5";
import { BsClock, BsFire, BsPerson } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import "./styles/index.scss";
import moment from "moment";
import { AiOutlineStar } from "react-icons/ai";
import { HiOutlineCalendar } from "react-icons/hi";
import MultipleImages from "../../components/MultipleImages";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import MySwiper from "./components/MySwiper";
import useLoading from "../../hooks/useLoading";
import { displayAlert } from "../../redux/reducers/alertSlice";
import MyModal from "../../components/Modal/MyModal";
import { Rate } from "antd";
import { setUser } from "../../redux/reducers/userSlice";

const OneTour = () => {
  const user = useAppSelector((state) => state.user.user);
  const [isReviewed, setIsReviewed] = useState<string | null>();

  const [modal, setModal] = useState(false);
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();
  const [popUp, setPopUp] = useState<Location | null | undefined>(null);
  const [myReview, setMyReview] = useState("");
  const [myRate, setMyRate] = useState(0);
  const { id } = useParams();
  const [tour, setTour] = useState<Tour>();

  const [viewport, setViewPort] = useState({
    longitude: 77.216,
    latitude: 28.6448,
    zoom: 6,
  });

  const [addToCart, loadingCart] = useLoading({
    callback: async (id) => {
      const res = await TourApi.addToCart(id);
      dispatch(setUser(res.data));
      dispatch(displayAlert({ type: true, title: "Item added to cart!" }));
    },
    onError: () => {
      displayAlert({ type: false, title: "Unable add to cart" });
    },
  });

  const [reviewTour, loadingReview] = useLoading({
    callback: async (id) => {
      //const res =

      await TourApi.reviewTour({
        tour: id,
        review: myReview,
        rating: myRate,
      });
      getTour(null);
      dispatch(
        displayAlert({ type: true, title: "Your review posted successfully!" })
      );
      setModal(false);
    },
    onError: () => {
      displayAlert({ type: false, title: "Unable to post review" });
    },
  });
  const [editRevire, edtiLoading] = useLoading({
    callback: async (id) => {
      // const res =

      await TourApi.updateReview(id, {
        review: myReview,
        rating: myRate,
      });
      getTour(null);
      dispatch(
        displayAlert({ type: true, title: "Your review edited successfully!" })
      );
      setModal(false);
    },
    onError: () => {
      displayAlert({ type: false, title: "Unable to edit review" });
    },
  });

  const [getTour, getIsLoading] = useFetching(async () => {
    const res = await TourApi.getTour(id);
    setTour(res.data);
    let finLatitude = 0;
    let finLongitude = 0;
    res.data.locations.forEach((item: Location) => {
      finLatitude = finLatitude + item.coordinates[1];
      finLongitude = finLongitude + item.coordinates[0];
    });

    setViewPort({
      ...viewport,
      latitude: finLatitude / res.data.locations.length,
      longitude: finLongitude / res.data.locations.length,
    });

    const foundReview = res.data.reviews.find(
      (item: Review) => item.user._id == user._id
    );

    foundReview ? setIsReviewed(foundReview._id) : setIsReviewed(null);
    setMyRate(foundReview.rating);
    setMyReview(foundReview.review);
  });
  useEffect(() => {
    getTour(null);
  }, []);
  return getIsLoading ? (
    <Loading />
  ) : (
    <div className="OneTour text-white ">
      <nav className="w-full bg-white h-[100px] dark:bg-slate-700"></nav>
      <header
        className="w-full h-[600px] bg-center bg-no-repeat bg-cover flex bg-fixed"
        style={{
          backgroundImage: `url(${
            import.meta.env.VITE_TOUR_IMG_URL + tour?.imageCover
          })`,
        }}
      >
        <div className="min-w-[350px] w-full sm:max-w-[500px] h-full bg-white/70 flex flex-col justify-center gap-2 p-4 te text-gray-900  dark:text-white dark:bg-slate-800/70">
          <h1 className="text-[40px] font-extrabold">{tour?.name}</h1>

          <p className="flex gap-1 text-[23px] items-center ">
            <BsClock />{" "}
            <span className="text-[21px]">{tour?.duration} days</span>
          </p>
          <p className="flex gap-1 text-[23px] items-center ">
            <IoLocationOutline />{" "}
            <span className="text-[21px]">
              {tour?.startLocation.description}
            </span>
          </p>
          <div className="flex justify-end  mt-[30px]">
            <button
              onClick={() => addToCart(id)}
              className="bg-blue-600 rounded-[30px] py-1 px-3"
            >
              {loadingCart ? "processing..." : "Add to cart"}
            </button>
          </div>
        </div>
      </header>
      <section className="bg-gradient-to-r text-black dark:text-white from-white to-slate-300 dark:from-slate-600 dark:to-slate-900 ">
        <div className="container mx-auto  flex lg:flex-row flex-col items-center">
          <div className="sm:w-1/2  flex flex-col items-center gap-2 py-[30px]">
            <h2 className="dark:text-white text-[25px]">Short information</h2>
            <ul className="short-inf flex flex-col gap-2 justify-center">
              <li>
                <HiOutlineCalendar />
                <span className="bold-text">Start date</span>
                <span className="thin-text ">
                  {moment(tour?.startDates[0]).format("MMMM  YYYY")}
                </span>
              </li>
              <li>
                <BsFire />
                <span className="bold-text">Difficulty</span>
                <span className="thin-text ">{tour?.difficulty}</span>
              </li>
              <li>
                <BsPerson />
                <span className="bold-text">Participants</span>
                <span className="thin-text ">{tour?.maxGroupSize}</span>
              </li>
              <li>
                <AiOutlineStar />
                <span className="bold-text">Rating</span>
                <span className="thin-text ">{tour?.ratingsAverage}/5</span>
              </li>
            </ul>
          </div>
          <div className="sm:w-1/2  flex flex-col items-center gap-2 px-4 py-[30px]">
            <h2 className="dark:text-white text-[25px]  font-bold">
              {tour?.name}
            </h2>
            <p className="max-w-[400px]">{tour?.description}</p>
          </div>
        </div>
      </section>
      <section className="flex justify-center">
        <MultipleImages images={tour?.images} cwidth={"100%"} />
      </section>

      <section className="w-full h-[400px]">
        <ReactMapGl
          {...viewport}
          onMove={({ viewState }) => setViewPort(viewState)}
          mapboxAccessToken={import.meta.env.VITE_MAP_BOX}
          mapStyle={
            theme == "dark"
              ? "mapbox://styles/imranovazer/cll812j3j00md01pl9wa8b31e"
              : "mapbox://styles/imranovazer/cll83z2ux00np01pmcivy6uoq"
          }
        >
          {tour?.locations.map((item, index) => (
            <Marker
              key={index}
              anchor="bottom"
              longitude={item.coordinates[0]}
              latitude={item.coordinates[1]}
            >
              <p
                className="text-[30px] cursor-pointer text-black dark:text-white"
                onClick={() => {
                  setPopUp(item);
                }}
              >
                <IoLocationSharp />
              </p>
            </Marker>
          ))}
          {popUp ? (
            <Popup
              className="text-black"
              closeOnClick={false}
              anchor="bottom"
              onClose={() => setPopUp(null)}
              latitude={popUp.coordinates[1]}
              longitude={popUp.coordinates[0]}
            >
              <p className="text-black">Day: {popUp.day}</p>
              <p className="text-black">Description: {popUp.description}</p>
            </Popup>
          ) : null}
        </ReactMapGl>
      </section>
      <section className="bg-gradient-to-r from-blue-600">
        <div className="container mx-auto px-5 py-16">
          <MySwiper slides={tour?.reviews} />

          <div className="w-full flex justify-center my-8">
            <button
              onClick={() => setModal(true)}
              className="w-[150px] bg-white shadow-xl font-bold dark:bg-slate-900 dark:hover:bg-slate-950 dark:text-white  hover:bg-slate-200 transition-all text-sky-600 py-2 px-3 rounded-[30px]"
            >
              {isReviewed ? "Edit my review" : "Review"}
            </button>
          </div>
        </div>
      </section>

      {modal ? (
        <MyModal open={modal} setOpen={setModal}>
          <div className="dark:text-white text-black flex flex-col items-center gap-4">
            <h1 className=" text-[30px]">Rate our tour</h1>
            <Rate
              className="text-sky-600"
              allowHalf
              defaultValue={myRate}
              onChange={(e) => setMyRate(e)}
            />

            <textarea
              value={myReview}
              id="message"
              rows={4}
              onChange={(e) => setMyReview(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
            <button
              onClick={() => {
                isReviewed ? editRevire(isReviewed) : reviewTour(id);
              }}
              className="w-[150px] bg-blue-600 shadow-xl font-bold  text-white  hover:bg-blue-700 transition-all  py-2 px-3 rounded-[30px]"
            >
              {isReviewed
                ? edtiLoading
                  ? "processing..."
                  : "Edit"
                : loadingReview
                ? "processing..."
                : "Post"}
            </button>
          </div>
        </MyModal>
      ) : null}
    </div>
  );
};

export default OneTour;
