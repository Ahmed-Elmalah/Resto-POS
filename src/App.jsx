import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OrderProvider } from "./store/OrderContext"; // استيراد البروفايدر

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import CasherLayout from "./layouts/CasherLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import CasherHomePage from "./pages/casherPages/CasherHomePage"
import Dashboard from "./pages/adminPage/Dashboard";

export default function App() {
  return (
    <OrderProvider> {/* تغليف التطبيق بالكامل بالـ Provider لحل مشاكل الـ Context */}
      <BrowserRouter>
        <Routes>
          {/* تعديل مسار اليوزر ليعرض الصفحة داخل الـ Layout */}
          <Route path="/" element={<UserLayout />} />

          <Route path="login" element={<h1>this is login page</h1>} />
          <Route path="signup" element={<h1>this is signup page</h1>} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard/>} />
            <Route path="menu" element={<h1>menu page</h1>} />
            <Route path="orders" element={<h1>orders page</h1>} />
            <Route path="tables" element={<h1>tabels page</h1>} />
            <Route path="staff" element={<h1>staff page</h1>} />
            <Route path="promotions" element={<h1>promotions page</h1>} />
            <Route path="settings" element={<h1>settings page</h1>} />
          </Route>

          {/* Cashier Routes */}
          <Route
            path="/casher"
            element={
              <ProtectedRoute allowedRole="cashier">
                <CasherHomePage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<h1>this is 404 page</h1>} />
        </Routes>
      </BrowserRouter>
    </OrderProvider>
  );
} 