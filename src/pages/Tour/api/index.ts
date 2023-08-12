import axiosInstance from "../../../axios";

const TourApi = {
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
};
export default TourApi;
