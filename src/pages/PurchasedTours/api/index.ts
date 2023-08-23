import axiosInstance from "../../../axios";

const PurchasedToursApi = {
  getMyBooking: async () => {
    try {
      const res = await axiosInstance.get("/bookings/my-bookings");
      return res.data;
    } catch (error) {}
  },
  deleteBooking: async (id: string) => {
    const res = await axiosInstance.delete(`/bookings/${id}`);
    return res.data;
  },
};
export default PurchasedToursApi;
