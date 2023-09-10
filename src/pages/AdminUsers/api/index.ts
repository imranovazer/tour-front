import axiosInstance from "../../../axios";

const usersApi = {
  createUser: async (data: any) => {
    const res = await axiosInstance.post(`/users`, data);
    return res.data;
  },
  getUsers: async () => {
    try {
      const res = await axiosInstance.get("/users");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteUser: async (id: string) => {
    const res = await axiosInstance.delete(`/users/${id}`);
    return res.data;
  },
  editUser: async (id: string, data: any) => {
    const res = await axiosInstance.patch(`/users/${id}`, data);
    return res.data;
  },
};
export default usersApi;
