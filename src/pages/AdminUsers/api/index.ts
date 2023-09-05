import axiosInstance from "../../../axios";

const usersApi = {
  getUsers: async () => {
    try {
      const res = await axiosInstance.get("/users");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
export default usersApi;
