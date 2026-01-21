import { useLocation, useNavigate } from "react-router-dom";
import loginRepo from "./LoginRepo";

export default function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  const login = (values) => {
    loginRepo
      .auth_login(values)
      .then((res) => {
        let jwt = res.data.jwt;
        sessionStorage.setItem("jwt-token", jwt);
        checkToken(jwt);
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const checkToken = (jwtfromparam = null) => {
    const jwt = jwtfromparam || sessionStorage.getItem("jwt-token") || localStorage.getItem("jwt-token");
    
    if (jwt) {
      loginRepo.check_token(jwt).then((res) => {
        const role = res.data.role?.name.toLowerCase();
        const userInfo = res.data;
        sessionStorage.setItem("user-info", JSON.stringify(userInfo));

        if (from) {
          navigate(from, { replace: true });
        } else {
          if (role === "admin") {
            navigate("/admin");
          } else if (role === "cashier") {
            navigate("/casher");
          } else {
            navigate("/"); 
          }
        }
      }).catch((err) => {
        logOut();
      });
    }
  };

  const logOut = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
  };

  return { login, checkToken, logOut };
}