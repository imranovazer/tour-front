import { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import useLoading from "../../hooks/useLoading";
import CartApi from "./api";
import { setUser } from "../../redux/reducers/userSlice";
import { BsFillTrashFill } from "react-icons/bs";
import { displayAlert } from "../../redux/reducers/alertSlice";
import { useNavigate } from "react-router-dom";
import MyModal from "../../components/Modal/MyModal";
import Logo from "../../components/ui/Logo";
import { BiLogoMastercard, BiLogoVisa } from "react-icons/bi";

function Cart() {
  const user = useAppSelector((state) => state.user.user);
  const [modal, setModal] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const calcTotal = useMemo(() => {
    let sum = 0;
    user.cart?.forEach((item) => {
      sum += item.count * item.product.price;
    });
    return sum;
  }, [user]);

  //@ts-ignore
  const [checkoutDebit, checkoutDebitLoading] = useLoading({
    callback: async () => {
      const res = await CartApi.checkoutWithdDebit();

      window.location.href = res.data.url;
    },
    onError: (error) => {
      dispatch(
        displayAlert({ type: false, title: error.response.data.message })
      );
    },
  });
  //@ts-ignore
  const [checkoutWallet, checkoutWalletLoading] = useLoading({
    callback: async () => {
      const res = await CartApi.checkoutWithWallet();

      dispatch(setUser(res.data));
      dispatch(
        displayAlert({ type: true, title: "Cart purchased successffuly" })
      );
      navigate("/payment-success");
    },
    onError: (error) => {
      dispatch(
        displayAlert({ type: false, title: error.response.data.message })
      );
    },
  });
  //@ts-ignore
  const [addToCart, isAddLoading] = useLoading({
    callback: async (id) => {
      const res = await CartApi.addToCart(id);

      dispatch(setUser(res.data));
    },
    onError: () => {
      console.log("Error");
    },
  });
  //@ts-ignore
  const [deleteFromCart, isDeleteLoading] = useLoading({
    callback: async ({ id, mode }) => {
      const res = await CartApi.removeFromCart(id, { deleteone: mode });

      dispatch(setUser(res.data));
    },
    onError: () => {
      console.log("Error");
    },
  });

  return (
    <div className="pt-[100px]">
      <div className="container mx-auto p-5 flex flex-col lg:flex-row gap-5">
        <div className="dark:bg-slate-700 bg-slate-100 w-full min-h-[400px] rounded-xl flex flex-col gap-5 p-5">
          {
            //@ts-ignore
            user.cart.length > 0 ? (
              user.cart?.map((item) => (
                <div
                  //@ts-ignore
                  key={item.product.id}
                  className="min-h-[100px]  bg-gradient-to-r dark:from-indigo-500 from-sky-500 dark:from-10% dark:via-sky-500 dark:via-30%  to-90% shadow-lg flex flex-col md:flex-row py-5 items-center justify-evenly gap-5 px-5"
                >
                  <img
                    src={
                      import.meta.env.VITE_TOUR_IMG_URL +
                      item.product.imageCover
                    }
                    className="w-[80px] h-[80px] rounded-full"
                    alt="product"
                  />

                  <div className="flex flex-col gap-2 font-light dark:text-white">
                    <span className="text-[20px]">{item.product.name}</span>
                    <span className="text-[13px]">
                      Ref : {item.product._id}
                    </span>
                  </div>

                  <div className="flex items-center gap-5 dark:text-white">
                    <span>{item.count}</span>
                    <div className="flex flex-col gap-2 items-center">
                      <button
                        className="rounded-full w-[25px] h-[25px] bg-blue-600 text-white dark:bg-gray-700"
                        onClick={() => addToCart(item.product._id)}
                      >
                        +
                      </button>
                      <button
                        className="rounded-full  w-[25px] h-[25px] bg-blue-600 text-white dark:bg-gray-700"
                        onClick={() =>
                          deleteFromCart({ id: item.product._id, mode: true })
                        }
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <div className="dark:text-white text-[20px]">
                    {item.count * item.product.price} USD
                  </div>

                  <div
                    className="cursor-pointer dark:text-white text-[20px] "
                    onClick={() =>
                      deleteFromCart({ id: item.product._id, mode: false })
                    }
                  >
                    <BsFillTrashFill />
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex items-center justify-center h-full">
                <h1 className="text-[20px] dark:text-white"> Cart is emty</h1>
              </div>
            )
          }
        </div>
        <div className="lg:w-[400px] w-full dark:bg-slate-700 bg-slate-100  min-h-[400px] rounded-xl flex flex-col justify-between gap-5 p-5">
          <div className="flex  flex-col gap-2">
            {user.cart?.map((item) => (
              <div
                //@ts-ignore
                key={item.product.id}
                className="py-2 rounded-lg bg-gradient-to-r from-sky-400 dark:bg-slate-500 shadow-lg flex items-center justify-evenly gap-5 px-5"
              >
                <div className="flex flex-col gap-2 font-light dark:text-white">
                  <span className="text-[14px]">{item.product.name}</span>
                </div>

                <div className="flex items-center gap-5 dark:text-white">
                  <span>{item.count}</span>
                </div>
                <div className="dark:text-white text-[14px]">
                  {item.count * item.product.price}$
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-3 rounded-lg p-2 dark:bg-slate-500">
            <span className="dark:text-white w-full">
              Total : {calcTotal}${" "}
            </span>
            <button
              className="rounded-lg w-full py-2 bg-blue-600 hover:bg-blue-700 transition-all text-white"
              onClick={() => setModal(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      {modal && (
        <MyModal open={modal} setOpen={setModal}>
          <div className="flex justify-between items-center gap-3">
            <button
              onClick={checkoutWallet}
              className="bg-black hover:bg-black/70  text-white  rounded-xl w-[250px] h-[60px] transition-all flex items-center justify-center"
            >
              <Logo />
              <span className=" text-[20px]  font-bold">Pay</span>
            </button>
            <button
              onClick={checkoutDebit}
              className="bg-black text-white text-[50px] hover:bg-black/70 w-[250px] h-[60px] rounded-xl  transition-all flex items-center  justify-center"
            >
              <BiLogoMastercard />
              <BiLogoVisa />
            </button>
          </div>
        </MyModal>
      )}
    </div>
  );
}

export default Cart;
