import fail from "../../assets/PaymenFailIm.png";
import { useNavigate } from "react-router-dom";
function PaymenFail() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-5 rounded-xl bg-slate-100 shadow-xl dark:bg-slate-800 p-14 ">
        <img src={fail} className="max-w-[200px]" alt="" />
        <h1 className="text-[30px] text-center text-red-500 font-bold dark:text-white">
          Payment was unsuccessful 😥
        </h1>
        <button
          onClick={() => navigate("/")}
          className="py-2 px-3 rounded-lg bg-red-500 text-white font-bold"
        >
          Go home{" "}
        </button>
      </div>
    </div>
  );
}

export default PaymenFail;
