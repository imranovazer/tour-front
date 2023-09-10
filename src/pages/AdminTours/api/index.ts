import axiosInstance from "../../../axios";

const adminToursApi = {
  getTours: async () => {
    try {
      const res = await axiosInstance.get("/tours");
      return res.data;
    } catch (error) {}
  },
  createTour: async (data: any) => {
    const res = await axiosInstance.post("/tours", data);
    return res.data;
  },
  editTour: async (id: string, data: any) => {
    const res = await axiosInstance.patch(`/tours/${id}`, data);
    return res.data;
  },
  deleteTour: async (id: string) => {
    const res = await axiosInstance.delete(`/tours/${id}`);
    return res.data;
  },
};
export default adminToursApi;
