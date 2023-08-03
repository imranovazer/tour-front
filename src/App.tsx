import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/PeotectedRoutes";
import Register from "./pages/Register/Register";
import Home from "./pages/Home";
import { useAppSelector } from "./redux/store/hooks";
import { useEffect } from "react";
import Login from "./pages/Login/Login";
import ForgotPass from "./pages/ForgotPassword/ForgotPass";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
function App() {
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    const element = document.documentElement;
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;

      default:
        localStorage.removeItem("theme");
        break;
    }
  }, [theme]);

  return (
    <Routes>
      <Route element={<ProtectedRoute shouldAuth={true} />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<ProtectedRoute shouldAuth={false} />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
      </Route>
      <Route path="/*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
