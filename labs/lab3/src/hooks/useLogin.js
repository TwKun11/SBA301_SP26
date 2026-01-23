// src/hooks/useLogin.js
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SET_EMAIL, SET_PASSWORD, LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from "../constants/authActionTypes";
import { mockUsers } from "../data/mockUsers";

export function useLogin() {
  const { state, dispatch } = useAuth(); // Dùng Context
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: LOGIN_START });

    setTimeout(() => {
      const user = mockUsers.find((u) => u.username === state.email && u.password === state.password);

      if (!user) {
        dispatch({ type: LOGIN_ERROR, payload: "Sai tài khoản hoặc mật khẩu" });
        return;
      }

      if (user.locked) {
        dispatch({ type: LOGIN_ERROR, payload: "Tài khoản đã bị khóa" });
        return;
      }

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          username: user.username,
          email: user.email || state.email,
          role: user.role,
          fullName: user.fullName,
        },
      });

      // Redirect dựa vào role
      if (user.role === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }, 1000);
  };

  return {
    state,
    dispatch,
    handleSubmit,
  };
}
