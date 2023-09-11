import { useEffect, useState } from "react";
import useFetching from "../../hooks/useFetching";
import PurchasedToursApi from "./api";
import { ContainerLoading } from "../../components/Loading";
import { Booking } from "../../types";
// import { BiRightArrow } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import moment from "moment";
// import { useNavigate } from "react-router-dom";
import MyModal from "../../components/Modal/MyModal";
import { LuHistory } from "react-icons/lu";
import useLoading from "../../hooks/useLoading";
import { useAppDispatch } from "../../redux/store/hooks";
import { displayAlert } from "../../redux/reducers/alertSlice";
import { TiTick } from "react-icons/ti";
function PurchasedTours() {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<boolean>(false);
  const [bookingToDelete, setBookingToDelete] = useState<string>("");

  const [bookings, setBookings] = useState<Booking[]>();

  const [getMyBookings, isGetLoading] = useFetching(async () => {
    try {
      const res = await PurchasedToursApi.getMyBooking();

      setBookings(res.data);
    } catch (error) {}
  });
  const [deleteBooking, deleteLoading] = useLoading({
    callback: async (id) => {
      // const res =
      await PurchasedToursApi.deleteBooking(id);
      setBookings((prevState) => {
        const newState = prevState?.filter(
          (item) => item._id != bookingToDelete
        );
        return newState;
      });
      dispatch(
        displayAlert({ type: true, title: "Purchase deleted successfully" })
      );
      setBookingToDelete("");
      setModal(false);
    },
    onError: () => {
      dispatch(
        displayAlert({ type: false, title: "Unable to delete booking" })
      );
    },
  });

  useEffect(() => {
    getMyBookings(null);
  }, []);
  return isGetLoading ? (
    <ContainerLoading />
  ) : (
    <div className="p-4 flex flex-col gap-5 dark:text-white">
      <h1 className="dark:text-white font-bold text-[30px]">
        <span className="flex gap-1 items-center">
          <LuHistory /> Purchase history
        </span>
      </h1>

      <div className="flex flex-col gap-4">
        {bookings?.map((booking) => (
          <div
            key={booking._id}
            className="flex flex-col md:flex-row md:items-center gap-3 justify-between bg-slate-200 dark:bg-slate-600 p-4 rounded-lg "
          >
            <div className="flex flex-col   gap-3">
              <p className="max-w-[300px] truncate">
                <span className="dark:text-sky-400 font-bold text-blue-600">
                  Purchased items :
                </span>{" "}
                <ul>
                  {booking.products.map((item, index) => (
                    <li key={index}>{item.tour?.name} </li>
                  ))}
                </ul>
              </p>
              <p>
                {" "}
                <span className="font-bold">Total price :</span> {booking.price}{" "}
                $
              </p>
              <p className="flex items-center gap-1">
                <BsClock />
                <p>Date : </p>
                <span>{moment(booking.createdAt).format("DD   MMM")}</span>
              </p>
              <p className="flex items-center gap-1">
                <p>Paid : </p>
                <span>
                  {booking.paid ? (
                    <div className="w-[20px] h-[20px] flex items-center justify-center bg-green-400 rounded-full">
                      <TiTick />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setBookingToDelete(booking._id);
                  setModal(true);
                }}
                className="w-[80px] py-1 rounded-[30px] bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <MyModal open={modal} setOpen={setModal}>
          <div className="flex items-center flex-col justify-evenly p-2 gap-3 dark:text-white">
            <h1 className="text-[21px] font-bold ">Deleting booking</h1>
            <p>
              Are you sure that you want to delete your booking fron history
            </p>
            <div className="flex items-center w-full mt-5 justify-evenly transition-all">
              <button
                onClick={() => deleteBooking(bookingToDelete)}
                className="bg-blue-600 hover:bg-blue-600/50 w-[150px] py-2 rounded-lg"
              >
                {deleteLoading ? "Deleting..." : "Sure"}
              </button>
              <button
                onClick={() => {
                  setModal(false);
                  setBookingToDelete("");
                }}
                className="bg-red-600 hover:bg-red-600/50 w-[150px] py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </MyModal>
      )}
    </div>
  );
}

export default PurchasedTours;
