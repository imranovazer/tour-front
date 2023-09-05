import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import { selectTheme, setTheme } from "../redux/reducers/themeSlice";
import { BsMoonStars } from "react-icons/bs";
interface DarkModeSwithProps {
  children: ReactNode;
}

function DarkModeSwitch({ children }: DarkModeSwithProps) {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (theme == "light") {
      dispatch(setTheme("dark"));
    } else if (theme == "dark") {
      dispatch(setTheme("light"));
    }
  };

  return (
    <>
      {children}
      <button
        className="w-12 h-12 rounded-full bg-white dark:bg-black fixed bottom-4 right-4 shadow-lg flex justify-center items-center "
        onClick={handleClick}
      >
        <BsMoonStars className="dark:text-white " />
      </button>
    </>
  );
}

export default DarkModeSwitch;
