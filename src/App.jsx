import { BrowserRouter, Route, Routes } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import CasherLayout from "./layouts/CasherLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import CasherHomePage from "./pages/casherPages/CasherHomePage";
import Dashboard from "./pages/adminPage/Dashboard";
import MenuPage from "./pages/adminPage/MenuPage";
import LoginPage from "./pages/loginPage/LoginPage";
import Register from "./pages/signUpPage/Register";
import LandingPage from "./pages/userPage/LandingPage"; // استيراد اللاندنج بيدج
import OrdersPage from "./pages/adminPage/OrdersPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- User Routes (Modified) --- */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<LandingPage />} />
          {/* كدة اللاندنج هتظهر جوه الـ Outlet بتاع الـ UserLayout */}
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
          <Route path="tables" element={<h1>tables page</h1>} />
          <Route path="staff" element={<h1>staff page</h1>} />
          <Route path="promotions" element={<h1>promotions page</h1>} />
          <Route path="settings" element={<h1>settings page</h1>} />
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
