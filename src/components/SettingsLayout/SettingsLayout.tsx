//import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FiBriefcase, FiCreditCard, FiStar, FiUser } from "react-icons/fi";

import "./SettingStyle.scss";
function SettingsLayout() {
  const url = useLocation().pathname;
  //const [active, setActive] = useState();
  const navigate = useNavigate();
  return (
    <div>
      <header className=" w-full h-[200px] bg-[url(/src/assets/wowL.jpg)]    dark:bg-[url(/src/assets/wow.jpg)] bg-cover bg-no-repeat ">
        <div className="container max-w-[1280px] px-5 py-[20px] mx-auto h-full flex items-end">
          <h1 className="text-[35px] font-bold dark:text-white">Settings</h1>
        </div>
      </header>

      <div className="container p-10 mx-auto">
        <div className="bg-white dark:bg-slate-700 rounded-xl w-full min-h-[500px] flex  flex-col  lg:flex-row shadow-lg overflow-hidden">
          <div className="  dark:text-white bg-slate-100 dark:bg-slate-800 p-5 w-full lg:w-1/4 lg:max-w-[300px]">
            <ul className="sett-side">
              <li className="group" onClick={() => navigate("account")}>
                <div
                  className={`${
                    url == "/settings/account" ||
                    url == "/settings" ||
                    url == "/settings/"
                      ? "w-1"
                      : "w-0"
                  }   group-hover:w-1  `}
                ></div>
                <FiUser />
                <p>Account</p>
              </li>
              <li className="group" onClick={() => navigate("bookings")}>
                <div
                  className={`${
                    url == "/settings/bookings" ? "w-1" : "w-0"
                  }   group-hover:w-1  `}
                ></div>
                <FiBriefcase />
                <p>Purchased tours</p>
              </li>
              <li className="group" onClick={() => navigate("reviews")}>
                <div
                  className={`${
                    url == "/settings/reviews" ? "w-1" : "w-0"
                  }   group-hover:w-1  `}
                ></div>
                <FiStar />
                <p>My reviews</p>
              </li>
              <li className="group" onClick={() => navigate("payment")}>
                <div
                  className={`${
                    url == "/settings/payment" ? "w-1" : "w-0"
                  }   group-hover:w-1  `}
                ></div>
                <FiCreditCard />
                <p>Payment</p>
              </li>
            </ul>
          </div>
          <div className="p-3 grow">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsLayout;
