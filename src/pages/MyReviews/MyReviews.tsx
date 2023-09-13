import { useEffect, useState } from "react";
import useFetching from "../../hooks/useFetching";
import MyReviewsApi from "./api";
import { ContainerLoading } from "../../components/Loading";
import { Review } from "../../types";
import { BiRightArrow } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import MyModal from "../../components/Modal/MyModal";

import useLoading from "../../hooks/useLoading";
import { useAppDispatch } from "../../redux/store/hooks";
import { displayAlert } from "../../redux/reducers/alertSlice";

function MyReviews() {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<boolean>(false);
  const [reviewToDelete, setReviewToDelete] = useState<string>("");
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>();
  const [getMyReviews, isGetLoading] = useFetching(async () => {
    try {
      const res = await MyReviewsApi.getMyReview();

      setReviews(res.data);
    } catch (error) {}
  });
  const [deleteReview, deleteLoading] = useLoading({
    callback: async (id) => {
      //@ts-ignore
      const res = await MyReviewsApi.delteReview(id);
      setReviews((prevState) => {
        const newState = prevState?.filter(
          (item) => item._id != reviewToDelete
        );
        return newState;
      });
      dispatch(
        displayAlert({ type: true, title: "Review deleted successfully" })
      );
      setReviewToDelete("");
      setModal(false);
    },
    onError: () => {
      dispatch(displayAlert({ type: false, title: "Unable to delete review" }));
    },
  });

  useEffect(() => {
    getMyReviews(null);
  }, []);
  return isGetLoading ? (
    <ContainerLoading />
  ) : (
    <div className="p-4 flex flex-col gap-5 dark:text-white">
      <h1 className="dark:text-white font-bold text-[30px]">My reviews</h1>

      <div className="flex flex-col gap-4">
        {reviews?.map((review) => (
          <div
            key={review._id}
            className="flex flex-col md:flex-row md:items-center gap-3 justify-between bg-slate-200 dark:bg-slate-600 p-4 rounded-lg "
          >
            <div className="flex flex-col  gap-3">
              <p className="max-w-[300px] truncate">
                <span className="dark:text-sky-500 text-blue-600">
                  Review :
                </span>{" "}
                {review.review}
              </p>
              <p className="flex items-center gap-1">
                <BsClock />
                <p>Date : </p>
                <span>{moment(review.createdAt).format("DD   MMM")}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setReviewToDelete(review._id);
                  setModal(true);
                }}
                className="w-[80px] py-1 rounded-[30px] bg-red-600 text-white"
              >
                Delete
              </button>
              <button
                onClick={() => navigate(`/tours/${review.tour}`)}
                className="px-3 py-1 rounded-[30px] flex items-center gap-1 bg-blue-500 text-white"
              >
                Tour{" "}
                <span className="text-[14px]">
                  <BiRightArrow />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <MyModal open={modal} setOpen={setModal}>
          <div className="flex items-center flex-col justify-evenly p-2 gap-3 dark:text-white">
            <h1 className="text-[21px] font-bold ">Deleting review</h1>
            <p>Are you sure that you want to delete your review</p>
            <div className="flex items-center w-full mt-5 justify-evenly transition-all">
              <button
                onClick={() => deleteReview(reviewToDelete)}
                className="bg-blue-600 hover:bg-blue-600/50 w-[150px] py-2 rounded-lg"
              >
                {deleteLoading ? "Deleting..." : "Sure"}
              </button>
              <button
                onClick={() => {
                  setModal(false);
                  setReviewToDelete("");
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

export default MyReviews;
