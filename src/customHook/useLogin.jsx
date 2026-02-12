import { useLocation, useNavigate } from "react-router-dom";
import loginRepo from "./LoginRepo";
import { useAuthuser } from "../store";

export default function useLogin() {
  const { syncUser } = useAuthuser();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  const signup = async (values) => {
    try {
      const res = await loginRepo.auth_signup(values);

      const { jwt, user } = res.data;
      const extraData = {
        gender: values.gender,
        phone_number: values.phone_number,
      };

      try {
        await loginRepo.update_user(user.id, extraData, jwt);
      } catch (updateErr) {
        console.error("Error updating extra profile data");
      }
      sessionStorage.setItem("jwt-token", jwt);
      checkToken(jwt);

      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const login = (values) => {
    return loginRepo
      .auth_login(values)
      .then((res) => {
        let jwt = res.data.jwt;
        sessionStorage.setItem("jwt-token", jwt);
        checkToken(jwt);
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  };

  const checkToken = (jwtfromparam = null) => {
    const jwt =
      jwtfromparam ||
      sessionStorage.getItem("jwt-token") ||
      localStorage.getItem("jwt-token");

    if (jwt) {
      loginRepo
        .check_token(jwt)
        .then((res) => {
          const userInfo = res.data;
          sessionStorage.setItem("user-info", JSON.stringify(userInfo));

          syncUser();

          const role = res.data.role?.name
            ? res.data.role.name.toLowerCase().trim()
            : "";

          if (role === "admin") {
            navigate("/admin", { replace: true });
          } else if (role === "cashier" || role === "casher") {
            navigate("/casher", { replace: true });
          } else {
            if (from && from !== "/login") {
              navigate(from, { replace: true });
            } else {
              navigate("/", { replace: true });
            }
          }
        })
        .catch((err) => {
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

  const logOutForUser = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
    syncUser();
  };

  const UpdateData = async (id, data) => {
    const jwt = sessionStorage.getItem("jwt-token");
    try {
      await loginRepo.update_user(id, data, jwt);
      // Update local data after successful server update
      await checkToken(jwt);
      return { success: true };
    } catch (err) {
      console.error("Update failed", err);
      return { success: false };
    }
  };

  const updatePassword = async (
    currentPassword,
    newPassword,
    confirmPassword,
  ) => {
    const jwt = sessionStorage.getItem("jwt-token");

    try {
      const data = {
        currentPassword: currentPassword,
        password: newPassword,
        passwordConfirmation: confirmPassword,
      };

      await loginRepo.change_password(data, jwt);
      return { success: true };
    } catch (err) {
      console.error("Password update error:", err.response?.data || err);
      return {
        success: false,
        error: err.response?.data?.error?.message || "Password update failed",
      };
    }
  };

  const createStaffAccount = async (values, extraData, roleId) => {
    const adminToken = sessionStorage.getItem("jwt-token");

    try {
      const res = await loginRepo.auth_signup(values);
      const newUser = res.data.user;
      const newUserToken = res.data.jwt;

      if (extraData) {
        try {
          await loginRepo.update_user(newUser.id, extraData, newUserToken);
        } catch (updateErr) {
          console.error("Failed to update extra data:", updateErr);
        }
      }

      if (roleId) {
        try {
          await loginRepo.update_user(newUser.id, { role: roleId }, adminToken);
        } catch (roleErr) {
          console.error("Failed to assign role:", roleErr);
          throw new Error("User created but failed to assign role");
        }
      }

      return res.data;
    } catch (err) {
      throw err;
    }
  };

  return {
    login,
    checkToken,
    logOut,
    signup,
    logOutForUser,
    UpdateData,
    updatePassword,
    createStaffAccount,
  };
}
