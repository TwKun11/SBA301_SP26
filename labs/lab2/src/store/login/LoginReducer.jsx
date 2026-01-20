// Login reducer và áp dụng vào login nhớ dùng useReducer

// Initial state
export const initialLoginState = {
  username: "",
  password: "",
  error: "",
  validated: false,
};

// Action types
export const LOGIN_ACTIONS = {
  SET_USERNAME: "SET_USERNAME",
  SET_PASSWORD: "SET_PASSWORD",
  SET_ERROR: "SET_ERROR",
  SET_VALIDATED: "SET_VALIDATED",
  RESET_FORM: "RESET_FORM",
};

// Reducer function
export const loginReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_ACTIONS.SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case LOGIN_ACTIONS.SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case LOGIN_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case LOGIN_ACTIONS.SET_VALIDATED:
      return {
        ...state,
        validated: action.payload,
      };
    case LOGIN_ACTIONS.RESET_FORM:
      return initialLoginState;
    default:
      return state;
  }
};
