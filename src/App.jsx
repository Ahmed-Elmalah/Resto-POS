import { BrowserRouter, Route, Routes } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./components/ProtectedRoute";
import CasherHomePage from "./pages/casherPages/CasherHomePage";
import Dashboard from "./pages/adminPage/Dashboard";
import MenuPage from "./pages/adminPage/MenuPage";
import LoginPage from "./pages/loginPage/LoginPage";
import Register from "./pages/signUpPage/Register";
import LandingPage from "./pages/userPage/LandingPage"; 
import OrdersPage from "./pages/adminPage/OrdersPage";
import TablesPage from "./pages/adminPage/TablesPage";
import StaffPage from "./pages/adminPage/StaffPage";
import UserMenuPage from "./pages/userPage/UserMenuPage";
import ReservationsPage from "./pages/userPage/ReservationsPage";
import OffersPage from "./pages/adminPage/OffersPage";
import SettingsPage from "./pages/adminPage/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductFormPage from "./pages/adminPage/ProductFormPage";
import { Toaster } from "react-hot-toast";
import OrderDetails from "./pages/adminPage/OrderDetails";
import AddStaffPage from "./pages/adminPage/AddStaffPage";
import EditStaffPage from "./pages/adminPage/EditStaffPage";
import CreateOfferPage from "./pages/adminPage/CreateOfferPage";
import OfferDetailsPage from "./pages/adminPage/OfferDetailsPage";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <Routes>
        {/* --- User Routes --- */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="menu" element={<UserMenuPage />} />
          <Route path="reservations" element={<ReservationsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* --- Auth Routes --- */}
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<Register />} />

        {/* --- Admin Routes --- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="menu/add" element={<ProductFormPage />} />
          <Route path="menu/edit/:id" element={<ProductFormPage />} />
          <Route path="orders">
            <Route index element={<OrdersPage />} />
            <Route path=":orderId" element={<OrderDetails />} />
          </Route>
          <Route path="tables" element={<TablesPage />} />
          <Route path="staff">
            <Route index element={<StaffPage />} />
            <Route path="add" element={<AddStaffPage />} />
            <Route path="edit/:id" element={<EditStaffPage />} />
          </Route>
          <Route path="promotions">
            <Route index element={<OffersPage />} />
            <Route path="new" element={<CreateOfferPage />} />
            <Route path=":id" element={<OfferDetailsPage />} />
          </Route>
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* --- Cashier Routes --- */}
        <Route
          path="/casher"
          element={
            <ProtectedRoute allowedRole="casher">
              <CasherHomePage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
