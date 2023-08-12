import axiosInstance from "../../../axios";

const PaymentApi = {
  cashIn: async (data: { amount: Number }) => {
    try {
      const res = await axiosInstance.post("/bookings/cash-in", data);
      
      return res.data;
    } catch (error) {}
  },
};
export default PaymentApi;
