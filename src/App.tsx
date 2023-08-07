import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/PeotectedRoutes";
import Register from "./pages/Register/Register";
import Home from "./pages/Landing/Home";
import { useAppSelector } from "./redux/store/hooks";
import { useEffect } from "react";
import Login from "./pages/Login/Login";
import ForgotPass from "./pages/ForgotPassword/ForgotPass";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Layout from "./components/Layout";
import Tours from "./pages/Tours/Tours";
import ErrorPage from "./pages/404";
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
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="tours" element={<Tours />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute shouldAuth={false} />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
      </Route>
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
