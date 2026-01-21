import { BrowserRouter, Route, Routes } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import CasherLayout from "./layouts/CasherLayout";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<UserLayout />} />
          
          <Route path="login" element={<h1>this is login page</h1>} />
          <Route path="signup" element={<h1>this is signup page</h1>} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<h1>admin laayout</h1>} />
            <Route path="menu" element={<h1>menu page</h1>} />
            <Route path="orders" element={<h1>orders page</h1>} />
            <Route path="tabels" element={<h1>tabels page</h1>} />
            <Route path="staff" element={<h1>staff page</h1>} />
            <Route path="promotions" element={<h1>promotions page</h1>} />
            <Route path="settings" element={<h1>settings page</h1>} />
          </Route>

          <Route
            path="/casher"
            element={
              <ProtectedRoute allowedRole="cashier">
                <CasherLayout />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<h1>this is 404 page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
