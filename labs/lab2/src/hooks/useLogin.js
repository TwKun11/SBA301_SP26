import { useContext, useReducer, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, AUTH_ACTIONS } from "../contexts/AuthContext";
import { loginReducer, initialLoginState, LOGIN_ACTIONS } from "../store/login/loginReducer";

/**
 * Custom hook để quản lý logic login
 * @returns {Object} { state, errors, handleUsernameChange, handlePasswordChange, handleLogin }
 */
export const useLogin = () => {
  const auth = useContext(AuthContext);
  const [state, dispatch] = useReducer(loginReducer, initialLoginState);
  const navigate = useNavigate();

  // Validation errors (local state for form validation)
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  if (!auth) {
    throw new Error("useLogin must be used within an AuthProvider");
  }

  // Khôi phục session từ localStorage - chỉ chạy 1 lần khi mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("lab2_isLoggedIn");
    const user = localStorage.getItem("lab2_username");
    if (loggedIn && user) {
      auth.dispatch({ type: AUTH_ACTIONS.RESTORE_SESSION, payload: user });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Validate một field cụ thể
   * @param {string} name - Tên field ('username' hoặc 'password')
   * @param {string} value - Giá trị của field
   */
  const validateField = (name, value) => {
    let message = "";

    if (!value.trim()) {
      message = name === "username" ? "Username không được để trống" : "Password không được để trống";
    } else if (name === "username" && value.length < 3) {
      message = "Username phải có ít nhất 3 ký tự";
    } else if (name === "password" && value.length < 6) {
      message = "Password phải có ít nhất 6 ký tự";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: message,
    }));
  };

  /**
   * Xử lý khi user thay đổi username
   * @param {string} value - Giá trị username mới
   */
  const handleUsernameChange = (value) => {
    dispatch({
      type: LOGIN_ACTIONS.SET_USERNAME,
      payload: value,
    });
    validateField("username", value);
  };

  /**
   * Xử lý khi user thay đổi password
   * @param {string} value - Giá trị password mới
   */
  const handlePasswordChange = (value) => {
    dispatch({
      type: LOGIN_ACTIONS.SET_PASSWORD,
      payload: value,
    });
    validateField("password", value);
  };

  /**
   * Xử lý khi user submit form login
   * @param {Event} e - Form submit event
   */
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch({ type: LOGIN_ACTIONS.SET_ERROR, payload: "" });

    // Validate form
    if (!state.username.trim() || !state.password.trim()) {
      if (!state.username.trim()) {
        validateField("username", "");
      }
      if (!state.password.trim()) {
        validateField("password", "");
      }
      return;
    }

    // Check for validation errors
    if (errors.username || errors.password) return;

    // Start loading
    dispatch({ type: LOGIN_ACTIONS.SET_VALIDATED, payload: true });

    // Simulate API call
    setTimeout(() => {
      if (state.username === "admin" && state.password === "123456") {
        localStorage.setItem("lab2_isLoggedIn", "true");
        localStorage.setItem("lab2_username", state.username);
        auth.dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: state.username });
        navigate("/");
      } else {
        dispatch({
          type: LOGIN_ACTIONS.SET_ERROR,
          payload: "Sai username hoặc password",
        });
        dispatch({ type: LOGIN_ACTIONS.SET_VALIDATED, payload: false });
      }
    }, 500);
  };

  /**
   * Xử lý đăng xuất
   */
  const handleLogout = () => {
    localStorage.removeItem("lab2_isLoggedIn");
    localStorage.removeItem("lab2_username");
    auth.dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  return {
    state: {
      isLoggedIn: auth.isLoggedIn,
      username: auth.username,
      formUsername: state.username,
      password: state.password,
      error: state.error,
      validated: state.validated,
    },
    errors,
    handleUsernameChange,
    handlePasswordChange,
    handleLogin,
    handleLogout,
  };
};
