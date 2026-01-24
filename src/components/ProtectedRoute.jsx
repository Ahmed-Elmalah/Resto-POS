import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({children , allowedRole}) {
    const token = sessionStorage.getItem("jwt-token") || localStorage.getItem("jwt-token");
    const userInfo = JSON.parse(sessionStorage.getItem("user-info")) || JSON.parse(localStorage.getItem("user-info"));
    const location = useLocation();

    if (!token) {
        return <Navigate to={'/'} state={{ from: location }} replace/>
    }

    const userRole = userInfo?.role?.name ? userInfo.role.name.toLowerCase().trim() : "";
    const requiredRole = allowedRole ? allowedRole.toLowerCase().trim() : "";

    if (requiredRole && userRole !== requiredRole){
        if (userRole === "admin") {
            return <Navigate to="/admin" replace />;
        } else if (userRole === "cashier" || userRole === "casher") {
            return <Navigate to="/casher" replace />;
        } else {
            // لو يوزر عادي وحاول يدخل صفحة أدمن أو كاشير، رجعه للـ Home
            return <Navigate to="/" replace />;
        }
    }

  return children;
}