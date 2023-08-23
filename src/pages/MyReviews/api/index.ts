import axiosInstance from "../../../axios";

const MyReviewsApi = {
  getMyReview: async () => {
    try {
      const res = await axiosInstance.get("/reviews/my-reviews");
      return res.data;
    } catch (error) {}
  },
  delteReview: async (id: string) => {
    const res = await axiosInstance.delete(`/reviews/${id}`);
    console.log(res.data);
    return res.data;
  },
};
export default MyReviewsApi;
