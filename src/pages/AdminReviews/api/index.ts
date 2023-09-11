import axiosInstance from "../../../axios";

const AdminReviewsApi = {
  getDropwdowns: async () => {
    try {
      const [tours, users] = await Promise.all([
        axiosInstance.get("/tours"),
        axiosInstance.get("/users"),
      ]);

      return [tours.data.data, users.data.data];
    } catch (error) {}
  },

  getAll: async () => {
    try {
      const res = await axiosInstance.get("/reviews");
      return res.data;
    } catch (error) {}
  },
  createReview: async (data: any) => {
    const res = await axiosInstance.post("/reviews", data);
    return res.data;
  },
  editReview: async (id: string, data: any) => {
    const res = await axiosInstance.patch(`/reviews/${id}`, data);
    return res.data;
  },
  deleteReview: async (id: string) => {
    const res = await axiosInstance.delete(`/reviews/${id}`);
    return res.data;
  },
};
export default AdminReviewsApi;
