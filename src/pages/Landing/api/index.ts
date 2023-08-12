import axiosInstance from "../../../axios";

const LandingPageApi = {
  getTopFiveTours: async () => {
    try {
      const res = await axiosInstance("/tours/top-5-cheap");
      return res.data;
    } catch (error) {}
  },
  sendEmail: async (data: {
    content: String | undefined;
    from: String | undefined;
  }) => {
    const res = await axiosInstance.post("/users/mail", data);
    return res.data;
  },
};

export default LandingPageApi;
