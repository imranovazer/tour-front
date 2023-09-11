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
import Tour from "./pages/Tour/Tour";
import SettingsLayout from "./components/SettingsLayout/SettingsLayout";
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings";
import MyReviews from "./pages/MyReviews/MyReviews";
import PurchasedTours from "./pages/PurchasedTours/PurchasedTours";
import Payment from "./pages/Payment/Payment";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import Cart from "./pages/Cart/Cart";
import AdminPanel from "./components/AdminPanelLayout/AdminPanel";
import AdminTours from "./pages/AdminTours/AdminTours";
import AdminUsers from "./pages/AdminUsers/AdminUsers";
import AdminReviews from "./pages/AdminReviews/AdminReviews";
import About from "./pages/About/About";
import AdminHome from "./pages/AdminHome";
import PaymenFail from "./pages/Payment/PaymentFail";

function App() {
  const theme = useAppSelector((state) => state.theme.theme);
  const user = useAppSelector((state) => state.user.user);
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
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<Tour />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-fail" element={<PaymenFail />} />
          <Route path="/settings" element={<SettingsLayout />}>
            <Route path="" element={<ProfileSettings />} />
            <Route path="account" element={<ProfileSettings />} />
            <Route path="reviews" element={<MyReviews />} />
            <Route path="bookings" element={<PurchasedTours />} />
            <Route path="payment" element={<Payment />} />
          </Route>
        </Route>
        {user.role === "admin" && (
          <Route path="/dashboard" element={<AdminPanel />}>
            <Route path="" element={<AdminHome />} />
            <Route path="tours" element={<AdminTours />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="reviews" element={<AdminReviews />} />
          </Route>
        )}
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
