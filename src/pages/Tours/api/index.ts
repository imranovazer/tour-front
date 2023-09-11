import axiosInstance from "../../../axios";

const ToursListApi = {
  addToCart: async (id: string | undefined) => {
    const res = await axiosInstance.post(`/tours/cart/${id}`);

    return res.data;
  },
  getGoodTours: async (query: string) => {
    const res = await axiosInstance.get(`/tours?${query}`);
    return res.data;
  },
  getAllTours: async () => {
    const res = await axiosInstance.get("/tours");
    return res.data;
  },
};

export default ToursListApi;
