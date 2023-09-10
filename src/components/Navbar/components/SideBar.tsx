import React from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../ui/Logo";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { CgDarkMode } from "react-icons/cg";
import NavbarApi from "../api";
import { logoutUser } from "../../../redux/reducers/userSlice";
import { LiaWalletSolid } from "react-icons/lia";
import { toggleTheme } from "../../../redux/reducers/themeSlice";
import { TbLogout2, TbSettings2 } from "react-icons/tb";
import { Badge } from "antd";
import { BiSolidCart } from "react-icons/bi";
const SiderBar: React.FC<{ open: boolean; setOpen: any }> = ({
  open,
  setOpen,
}) => {
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    try {
      //const res =

      await NavbarApi.logout();
      dispatch(logoutUser());
    } catch (error) {}
  };
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  return (
    open && (
      <motion.div
        animate={{ x: 0 }}
        initial={{ x: "100%" }}
        transition={{
          duration: 0.3,
        }}
        className="w-full p-5 pt-[80px] h-screen md:hidden dark:bg-slate-900 bg-slate-200 fixed flex flex-col gap-5 top-0 overflow-hidden"
      >
        <ul className=" flex flex-col items-center gap-4 dark:text-white dark:bg-slate-800 bg-white rounded-xl p-4">
          <li onClick={() => navigate("/")}>
            <Logo />
          </li>
          <li>
            <NavLink to="/" onClick={() => setOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/tours" onClick={() => setOpen(false)}>
              Tours
            </NavLink>
          </li>
          {user.role === "admin" ? (
            <li>
              {" "}
              <NavLink to="/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </NavLink>
            </li>
          ) : null}
          <li>
            <NavLink to="/about" onClick={() => setOpen(false)}>
              About
            </NavLink>
          </li>
        </ul>
        <div>
          <Badge count={user.cart?.length} className="w-full" size="default">
            <div
              className="p-3   flex  cursor-pointer items-center text-[20px] bg-white dark:bg-slate-800  dark:text-white  rounded-lg"
              onClick={() => {
                navigate("/cart");
                setOpen(false);
              }}
            >
              <BiSolidCart /> Cart
            </div>
          </Badge>
        </div>
        <ul
          //@ts-ignore

          className="drop-down w-full overflow-hidden py-2    dark:bg-slate-900 bg-white  dark:text-white right-0 rounded-lg top-[60px] shadow-xl transition-all"
        >
          <div className="p-2">
            <div className="bg-slate-200 dark:bg-slate-700  rounded-lg w-full  flex flex-col">
              <div className="flex  px-2 items-center gap-4 dark:text-white border-b border-b-slate-400 dark:border-b-white p-2">
                <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden cursor-pointer flex items-center justify-center relative">
                  {user.photo && (
                    <img
                      src={`${import.meta.env.VITE_USER_IMG_URL}${user.photo}`}
                      alt="ava"
                    />
                  )}
                </div>
                <p> {user.name}</p>
              </div>
              <div className="flex  px-2  gap-4 dark:text-white  flex-col  p-2">
                <p className="text-sm font-bold">AnywherePay</p>
                <div className="flex items-center gap-1">
                  <p className="text-[20px] ">
                    <LiaWalletSolid />
                  </p>
                  <p>{`${user.wallet} $`}</p>
                </div>
              </div>
            </div>
          </div>
          <li onClick={() => dispatch(toggleTheme())}>
            <CgDarkMode />
            <p>Theme</p>
          </li>
          <li
            onClick={() => {
              navigate("/settings");
              setOpen(false);
            }}
          >
            <TbSettings2 /> <p>Settings</p>
          </li>
          <li onClick={handleLogout}>
            <TbLogout2 /> <p>Log out</p>
          </li>
        </ul>
      </motion.div>
    )
  );
};

export default SiderBar;
