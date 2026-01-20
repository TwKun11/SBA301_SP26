import { createContext, useReducer } from "react";

// Auth Context
export const AuthContext = createContext();

// Auth state - chỉ quản lý authentication
const initialAuthState = {
  isLoggedIn: false,
  username: "",
};

// Auth actions
const AUTH_ACTIONS = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT",
  RESTORE_SESSION: "RESTORE_SESSION",
};

// Auth reducer - chỉ xử lý authentication logic
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        username: action.payload,
      };
    case AUTH_ACTIONS.LOGOUT:
      return initialAuthState;
    case AUTH_ACTIONS.RESTORE_SESSION:
      return {
        isLoggedIn: true,
        username: action.payload,
      };
    default:
      return state;
  }
};

// Auth Provider - chỉ quản lý state
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const value = {
    isLoggedIn: state.isLoggedIn,
    username: state.username,
    dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AUTH_ACTIONS };
