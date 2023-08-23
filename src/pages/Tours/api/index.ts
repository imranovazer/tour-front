import axiosInstance from "../../../axios";

const ToursListApi = {
  getAllTours: async () => {
    const res = await axiosInstance.get("/tours");
    return res.data;
  },
};

export default ToursListApi;
