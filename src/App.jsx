// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { OrderProvider } from "./store/OrderContext"; // استيراد البروفايدر

// import UserLayout from "./layouts/UserLayout";
// import AdminLayout from "./layouts/AdminLayout";
// import CasherLayout from "./layouts/CasherLayout";
// import ProtectedRoute from "./components/ProtectedRoute";
// import CasherHomePage from "./pages/casherPages/CasherHomePage";
// import Dashboard from "./pages/adminPage/Dashboard";
// import MenuPage from "./pages/adminPage/MenuPage";
// import LoginPage from "./pages/loginPage/LoginPage";
// import Register from "./pages/signUpPage/Register";

// export default function App() {
//   return (
//     <OrderProvider>
//       {/* تغليف التطبيق بالكامل بالـ Provider لحل مشاكل الـ Context */}
//       <BrowserRouter>
//         <Routes>
//           {/* تعديل مسار اليوزر ليعرض الصفحة داخل الـ Layout */}
//           <Route path="/" element={<UserLayout />} />

//           <Route path="login" element={<LoginPage />} />
//           <Route path="signup" element={<Register />} />

//           {/* Admin Routes */}
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute allowedRole="admin">
//                 <AdminLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route index element={<Dashboard />} />
//             <Route path="menu" element={<MenuPage />} />
//             <Route path="orders" element={<h1>orders page</h1>} />
//             <Route path="tables" element={<h1>tabels page</h1>} />
//             <Route path="staff" element={<h1>staff page</h1>} />
//             <Route path="promotions" element={<h1>promotions page</h1>} />
//             <Route path="settings" element={<h1>settings page</h1>} />
//           </Route>

//           {/* Cashier Routes */}
//           <Route
//             path="/casher"
//             element={
//               <ProtectedRoute allowedRole="cashier">
//                 <CasherHomePage />
//               </ProtectedRoute>
//             }
//           />

//           <Route path="*" element={<h1>this is 404 page</h1>} />
//         </Routes>
//       </BrowserRouter>
//     </OrderProvider>
//   );
// }

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OrderProvider } from "./store/OrderContext";

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

export default function App() {
  return (
    <OrderProvider>
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
            <Route path="orders" element={<h1>orders page</h1>} />
            <Route path="tables" element={<h1>tables page</h1>} />
            <Route path="staff" element={<h1>staff page</h1>} />
            <Route path="promotions" element={<h1>promotions page</h1>} />
            <Route path="settings" element={<h1>settings page</h1>} />
          </Route>

          {/* --- Cashier Routes --- */}
          <Route
            path="/casher"
            element={
              <ProtectedRoute allowedRole="cashier">
                <CasherLayout />
                {/* استخدم الـ Layout هنا لو فيه ناف بار للكاشير */}
              </ProtectedRoute>
            }
          >
            <Route index element={<CasherHomePage />} />
          </Route>

          <Route path="*" element={<h1>this is 404 page</h1>} />
        </Routes>
      </BrowserRouter>
    </OrderProvider>
  );
}
