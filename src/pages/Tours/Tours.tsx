import { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar";
import useFetching from "../../hooks/useFetching";
import ToursListApi from "./api";
import { Tour } from "../../types";
import { ContainerLoading } from "../../components/Loading";
import { BsFillCartPlusFill } from "react-icons/bs";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import { Slider } from "antd";
import { useAppDispatch } from "../../redux/store/hooks";
import { setUser } from "../../redux/reducers/userSlice";
import { displayAlert } from "../../redux/reducers/alertSlice";

function Tours() {
  const dispatch = useAppDispatch();
  const [price, setPrice] = useState<{ min: number; max: number } | null>();

  const [difficulty, setDifficulty] = useState<
    "medium" | "difficult" | "easy" | null
  >(null);
  const [inputText, setInputText] = useState("");
  const [tours, setTours] = useState<Tour[]>([]);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const [getAllTours, getAllLoading] = useFetching(async () => {
    const res = await ToursListApi.getAllTours();
    setTours(res.data);
    console.log("data", res.data);
  });
  const [searchTours, searchLoading] = useLoading({
    callback: async (param) => {
      let query = "";
      if (inputText) {
        query += `name=${param}`;
      }
      if (difficulty) {
        query += `&difficulty=${difficulty}`;
      }
      if (price) {
        query += `&price[gte]=${price.min}&price[lte]=${price.max}`;
      }
      const res = await ToursListApi.getGoodTours(query);
      setTours(res.data);
    },
    onError: () => {
      console.log("Error");
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    searchTours(inputText);
  };

  useEffect(() => {
    getAllTours(null);
  }, []);
  const handlePrice = ([min, max]: [number, number]) => {
    setPrice({ min, max });
  };
  //@ts-ignore
  const [addToCart, loadingCart] = useLoading({
    callback: async (id) => {
      const res = await ToursListApi.addToCart(id);
      dispatch(setUser(res.data));
      dispatch(displayAlert({ type: true, title: "Item added to cart!" }));
    },
    onError: () => {
      displayAlert({ type: false, title: "Unable add to cart" });
    },
  });
  return (
    <div className=" dark:bg-slate-700">
      <header className="bg-[url(/src/assets/ToursLightHeader.jpg)] dark:bg-[url(/src/assets/ToursHeaderDark.jpg)] bg-cover bg-center bg-no-repeat ">
        <div className="contaier  pt-[100px] pb-16 mx-auto flex flex-col gap-6 items-center px-5">
          <h1 className="font-bold dark:text-white text-[40px] sm:text-[55px]">
            Explore tours
          </h1>
          <Searchbar
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            searchTours={searchTours}
            loading={searchLoading}
            dropdown={dropdown}
            setDropdown={setDropdown}
            inputText={inputText}
            setInputText={setInputText}
            onSubmit={handleSubmit}
          />
          <div className="w-full max-w-[1000px]">
            <div className="bg-white rounded-[50px] dark:text-white dark:bg-slate-700 w-full gap-3 px-3 max-w-[300px] flex items-center">
              Price:
              <Slider
                onChange={handlePrice}
                className="w-full"
                range
                defaultValue={[0, 20000]}
                max={5000}
                min={0}
              />
              $
            </div>
          </div>
        </div>
      </header>
      <div className="container pt-[100px] mx-auto flex flex-col items-center gap-10 px-10 pb-10">
        {getAllLoading ? (
          <ContainerLoading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {tours.map((tour, index) => (
              <div
                key={index}
                className="flex group  flex-col justify-between gap-3 p-5 justify-self-center rounded-xl max-w-[300px] w-full  bg-white shadow-lg hover:shadow-2xl  dark:bg-slate-900 h-[400px]"
              >
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-2 p-1">
                    <span className="dark:text-white font-bold">
                      {tour.name}{" "}
                    </span>
                    <span className="dark:text-white">
                      {moment(tour.startDates[0]).format("D MMM Y")}
                    </span>
                  </div>
                  <div
                    onClick={() => addToCart(tour._id)}
                    className="text-white  text-[18px] w-[40px] h-[40px] rounded-full bg-blue-600   dark:bg-slate-500 flex items-center justify-center cursor-pointer"
                  >
                    <BsFillCartPlusFill />
                  </div>
                </div>
                <div className="w-full  rounded-lg overflow-hidden	 h-[300px]">
                  <img
                    className="w-full size object-cover duration-300	 h-full transition-transform transform-gpu group-hover:scale-105"
                    src={import.meta.env.VITE_TOUR_IMG_URL + tour.imageCover}
                    alt="tour"
                  />
                </div>
                <div className="flex p-1 justify-between ">
                  <div className="flex flex-col gap-1 dark:text-white">
                    <span className="text-[12px]">Total price:</span>
                    <span className="font-bold text-[17px]">${tour.price}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/tours/${tour._id}`)}
                    className="rounded-[30px]  px-4 hover:shadow-lg bg-blue-600 text-white flex items-center justify-center"
                  >
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tours;
