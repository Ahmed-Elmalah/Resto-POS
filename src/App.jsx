import { BrowserRouter, Route, Routes } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./components/ProtectedRoute";
import CasherHomePage from "./pages/casherPages/CasherHomePage";
import Dashboard from "./pages/adminPage/Dashboard";
import MenuPage from "./pages/adminPage/MenuPage";
import LoginPage from "./pages/loginPage/LoginPage";
import Register from "./pages/signUpPage/Register";
import LandingPage from "./pages/userPage/LandingPage"; // استيراد اللاندنج بيدج
import OrdersPage from "./pages/adminPage/OrdersPage";
import TablesPage from "./pages/adminPage/TablesPage";
import StaffPage from "./pages/adminPage/StaffPage";
import UserMenuPage from "./pages/userPage/UserMenuPage";
import ReservationsPage from "./pages/userPage/ReservationsPage";
import OffersPage from "./pages/adminPage/OffersPage";
import SettingsPage from "./pages/adminPage/SettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- User Routes --- */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="menu" element={<UserMenuPage />} />
          <Route path="reservations" element={<ReservationsPage />} />
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
          <Route path="orders" element={<OrdersPage/>} />
          <Route path="tables" element={<TablesPage/>} />
          <Route path="staff" element={<StaffPage/>} />
          <Route path="promotions" element={<OffersPage/>} />
          <Route path="settings" element={<SettingsPage/>} />
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

        <Route path="*" element={<h1>this is 404 page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
