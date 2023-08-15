import axiosInstance from "../../../axios";

const TourApi = {
  addToCart: async (id: string | undefined) => {
    const res = await axiosInstance.post(`/tours/cart/${id}`);

    return res.data;
  },

  getTour: async (id: string | undefined) => {
    try {
      const res = await axiosInstance.get(`/tours/${id}`);

      return res.data;
    } catch (error) {}
  },
  reviewTour: async (data: {
    review: string;
    rating: number;
    tour: string;
  }) => {
    const res = await axiosInstance.post("/reviews", data);
    return res.data;
  },
  updateReview: async (
    id: string,
    data: {
      review: string;
      rating: number;
    }
  ) => {
    const res = await axiosInstance.patch(`/reviews/${id}`, data);
    return res.data;
  },
};
export default TourApi;
