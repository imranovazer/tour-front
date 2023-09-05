import axiosInstance from "../../../axios";

const CartApi = {
  checkoutWithWallet: async () => {
    const res = await axiosInstance.post(`/bookings/checkout-wallet`);
    return res.data;
  },
  checkoutWithdDebit: async () => {
    const res = await axiosInstance.get(`/bookings/checkout-session`);
    return res.data;
  },

  addToCart: async (id: string | undefined) => {
    const res = await axiosInstance.post(`/tours/cart/${id}`);

    return res.data;
  },
  removeFromCart: async (
    id: string | undefined,
    mode: { deleteone: boolean }
  ) => {
    console.log(id, mode);

    const res = await axiosInstance.delete(`/tours/cart/${id}`, { data: mode });

    return res.data;
  },
};
export default CartApi;
