import React, { useState } from "react";
import Logo from "../../components/ui/Logo";
import { useAppSelector } from "../../redux/store/hooks";
import useLoading from "../../hooks/useLoading";
import MyModal from "../../components/Modal/MyModal";
import PaymentApi from "./api";

function Payment() {
  const [modal, setModal] = useState(false);
  const [amount, setAmount] = useState<Number>(0);
  const [walletFill, isLoadingWallet] = useLoading({
    callback: async () => {
      const res = await PaymentApi.cashIn({ amount });
      window.location.href = res.session.url;
      // console.log(res);
    },
    onError: () => {
      console.log("Error");
    },
  });
  const handleFill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    walletFill(null);
  };
  const user = useAppSelector((state) => state.user.user);
  return (
    <div className="p-3 dark:text-white flex flex-col gap-5">
      <div className="rounded-lg bg-slate-50 transition-all dark:bg-black border dark:border-none  shadow-2xl min-h-[240px] max-w-[400px] flex flex-col justify-between gap-5 p-4">
        <div className="flex items-center">
          <Logo />
          <span className="font-bold text-xl">Pay</span>
        </div>

        <div className="flex flex-col gap-4">
          <span className="truncate">Id : {user._id}</span>

          <span>Balance :{user.wallet}$</span>
        </div>
      </div>
      <button
        onClick={() => setModal(true)}
        className="bg-blue-600 transition-all text-white  rounded-[50px] py-2 px-3 hover:bg-blue-700 max-w-[150px]"
      >
        Fill up wallet
      </button>
      {modal && (
        <MyModal open={modal} setOpen={setModal}>
          <div>
            <form onSubmit={handleFill} className="flex flex-col gap-4">
              <label
                htmlFor="money"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                How much do you want add to your wallet
              </label>
              <input
                //@ts-ignore
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                id="money"
                min={0}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                required
              />
              <button className="bg-blue-600 transition-all text-white  rounded-[50px] py-2 px-3 hover:bg-blue-700 max-w-[150px]">
                {isLoadingWallet ? "Processing..." : "Purchase"}
              </button>
            </form>
          </div>
        </MyModal>
      )}
    </div>
  );
}

export default Payment;
