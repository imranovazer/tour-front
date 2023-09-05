import sucess from "../../assets/success.svg";
import { useNavigate } from "react-router-dom";
function PaymentSuccess() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-5 rounded-xl bg-slate-100 shadow-xl dark:bg-slate-800 p-14 ">
        <img src={sucess} alt="" />
        <h1 className="text-[30px] text-center text-sky-600 font-bold dark:text-white">
          Payment was successful!
        </h1>
        <button
          onClick={() => navigate("/")}
          className="py-2 px-3 rounded-lg bg-blue-600 text-white font-bold"
        >
          Go home{" "}
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
