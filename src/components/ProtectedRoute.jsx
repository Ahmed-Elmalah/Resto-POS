import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({children , allowedRole}) {

    const token = sessionStorage.getItem("jwt-token") || localStorage.getItem("jwt-token");
    const userInfo = JSON.parse(sessionStorage.getItem("user-info")) || JSON.parse(localStorage.getItem("user-info"));
    const location = useLocation();

    if (!token) {
        return <Navigate to={'/'} state={{ from: location }} replace/>
    }

    if (allowedRole && userInfo?.role?.name !== allowedRole){
        return <Navigate to={userInfo?.role?.name === "admin" ? "/admin" : "/casher"} replace />;
    }

  return children
}
