import { useState, useEffect, useRef } from "react";
import Logo from "../ui/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import "./styles/Navbar.scss";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { TbLogout2, TbSettings2 } from "react-icons/tb";
import { LiaWalletSolid } from "react-icons/lia";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import NavbarApi from "./api";
import { logoutUser } from "../../redux/reducers/userSlice";
import { BiSolidCart } from "react-icons/bi";
import { Badge } from "antd";
import { CgDarkMode } from "react-icons/cg";
import { toggleTheme } from "../../redux/reducers/themeSlice";
import SiderBar from "./components/SideBar";
import { useAnimation, motion } from "framer-motion";

import { HiOutlineMenu } from "react-icons/hi";

// const scrolled =
//   "bg-white  h-14 max-w-[1300px] mx-auto rounded-[50px] flex items-center px-5 dark:bg-slate-950 shadow-xl transition-all";
// const notscrolled =
//   "bg-transparent h-14 max-w-[1300px] mx-auto rounded-[50px] flex items-center px-5 dark:bg-transparent transition-all ";

function Navbar() {
  const [sideBar, setSideBar] = useState(false);
  const handleLogout = async () => {
    try {
      //const res =

      await NavbarApi.logout();
      dispatch(logoutUser());
    } catch (error) {}
  };
  const dropdownRef = useRef<HTMLInputElement>(null);
  useOutsideAlerter(dropdownRef, () => setDropdown(false));
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  const [dropDown, setDropdown] = useState<boolean>(false);
  const handleScrolledNav = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScrolledNav);
    return () => window.removeEventListener("scroll", handleScrolledNav);
  }, []);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const controls = useAnimation();

  const handleButtonClick = () => {
    setSideBar((prevState) => !prevState);

    // You can adjust the rotation and opacity values as needed

    const rotation = sideBar ? 0 : 180;

    controls.start({
      rotate: rotation,
    });
  };
  return (
    <div className="fixed top-6 w-full z-40 ">
      <div className="container  mx-auto px-3 ">
        <div
          className={`relative h-14 max-w-[1300px] hidden  justify-between mx-auto rounded-[50px] md:flex items-center px-4   transition-all  ${
            isScrolled
              ? "bg-white dark:bg-slate-900 shadow-xl"
              : "bg-transparent dark:bg-transparent"
          }`}
        >
          <ul className="navbar-ul flex items-center gap-4">
            <li onClick={() => navigate("/")}>
              <Logo />
            </li>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/tours">Tours</NavLink>
            </li>
            {user.role === "admin" ? (
              <li>
                {" "}
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            ) : null}
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>

          <div className="flex items-center gap-5 ">
            <Badge count={user.cart?.length} size="small">
              <div
                className="w-10 h-10 flex justify-center cursor-pointer items-center text-[20px]  dark:text-white text-sky-600 dark:border-white border-sky-600 border-2 rounded-full"
                onClick={() => navigate("/cart")}
              >
                <BiSolidCart />
              </div>
            </Badge>
            <div
              onClick={() => setDropdown((prevState) => !prevState)}
              className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden cursor-pointer flex items-center justify-center relative"
            >
              {user.photo && (
                <img
                  src={`${import.meta.env.VITE_USER_IMG_URL}${user.photo}`}
                  alt="ava"
                />
              )}
            </div>
          </div>
          {dropDown && (
            <ul
              //@ts-ignore
              ref={dropdownRef}
              className="drop-down min-w-[300px] overflow-hidden py-2    dark:bg-slate-900 bg-white absolute dark:text-white right-0 rounded-lg top-[60px] shadow-xl transition-all"
            >
              <div className="p-2">
                <div className="bg-slate-200 dark:bg-slate-700  rounded-lg w-full  flex flex-col">
                  <div className="flex  px-2 items-center gap-4 dark:text-white border-b border-b-slate-400 dark:border-b-white p-2">
                    <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden cursor-pointer flex items-center justify-center relative">
                      {user.photo && (
                        <img
                          src={`${import.meta.env.VITE_USER_IMG_URL}${
                            user.photo
                          }`}
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
                  setDropdown(false);
                }}
              >
                <TbSettings2 /> <p>Settings</p>
              </li>
              <li onClick={handleLogout}>
                <TbLogout2 /> <p>Log out</p>
              </li>
            </ul>
          )}
        </div>
        <div className="w-full md:hidden flex items-center justify-end">
          <motion.button
            onClick={handleButtonClick}
            className="rounded-full z-50 dark:bg-slate-900 flex flex-col justify-center gap-1 items-center bg-white w-[50px] h-[50px]"
          >
            <motion.div
              initial={false}
              animate={controls}
              className="flex justify-center items-center text-[20px] dark:text-white"
            >
              <HiOutlineMenu />
            </motion.div>
          </motion.button>
        </div>
      </div>
      <SiderBar open={sideBar} setOpen={setSideBar} />
    </div>
  );
}

export default Navbar;
