import { useLocation, useNavigate } from "react-router-dom";
import loginRepo from "./LoginRepo";
import { useAuthuser } from "../store";

export default function useLogin() {
  const {syncUser} = useAuthuser();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  const signup = (values) => {
  loginRepo.auth_signup(values)
    .then((res) => {
      const { jwt, user } = res.data;
      const extraData = {
        gender: values.gender,
        phone_number: values.phone_number
      };

      loginRepo.update_user(user.id, extraData, jwt)
        .then(() => {
          sessionStorage.setItem("jwt-token", jwt);
          checkToken(jwt); 
        })
        .catch((err) => {
          console.error("Error updating extra profile data", err);
          sessionStorage.setItem("jwt-token", jwt);
          checkToken(jwt);
        });
    })
    .catch((err) => {
      console.log("Error in initial signup", err);
    });
};

  const login = (values) => {
    loginRepo
      .auth_login(values)
      .then((res) => {
        let jwt = res.data.jwt;
        sessionStorage.setItem("jwt-token", jwt);
        console.log(res);
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
        const userInfo = res.data;
        sessionStorage.setItem("user-info", JSON.stringify(userInfo));

        syncUser();

        const role = res.data.role?.name ? res.data.role.name.toLowerCase().trim() : "";

        if (role === "admin") {
          navigate("/admin", { replace: true });
        } 
        else if (role === "cashier" || role === "casher") {
          navigate("/casher", { replace: true });
        } 
        else {
          if (from && from !== "/login") {
            navigate(from, { replace: true });
          } else {
            navigate("/", { replace: true }); 
          }
        }
      }).catch((err) => {
        console.error(err);
        logOut();
      });
    }
  };

  const logOut = () => {
    sessionStorage.clear();
    localStorage.clear();
    syncUser();
    navigate("/login");
  };

  const logOutForUser =  () => {
    sessionStorage.clear();
    localStorage.clear();
    syncUser();
  };


  return { login, checkToken, logOut , signup , logOutForUser};
}