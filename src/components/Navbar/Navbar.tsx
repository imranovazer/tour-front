import React, { useState, useEffect, useRef } from "react";
import Logo from "../ui/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import "./styles/Navbar.scss";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { TbLogout2, TbSettings2 } from "react-icons/tb";
import { LiaWalletSolid } from "react-icons/lia";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import NavbarApi from "./api";
import { logoutUser } from "../../redux/reducers/userSlice";
// const scrolled =
//   "bg-white  h-14 max-w-[1300px] mx-auto rounded-[50px] flex items-center px-5 dark:bg-slate-950 shadow-xl transition-all";
// const notscrolled =
//   "bg-transparent h-14 max-w-[1300px] mx-auto rounded-[50px] flex items-center px-5 dark:bg-transparent transition-all ";

function Navbar() {
  const handleLogout = async () => {
    try {
      const res = await NavbarApi.logout();
      dispatch(logoutUser());
    } catch (error) {}
  };
  const dropdownRef = useRef();
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

  return (
    <div className="fixed top-6 w-full z-40 ">
      <div className="container  mx-auto px-3 ">
        <div
          className={`relative h-14 max-w-[1300px] justify-between mx-auto rounded-[50px] flex items-center px-4   transition-all  ${
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
          </ul>

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
          {dropDown && (
            <ul
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
      </div>
    </div>
  );
}

export default Navbar;
