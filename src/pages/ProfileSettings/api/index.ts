import axiosInstance from "../../../axios";

const ProfileApi = {
  updateMe: async (data: any) => {
    const res = await axiosInstance.patch("/users/updateMe", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
  updatePassword: async (data: any) => {
    const res = await axiosInstance.patch("/users/updateMyPassword", data);
    return res.data;
  },
};

export default ProfileApi;
