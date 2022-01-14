import { AUTH, LOGOUT, FETCH_USER } from "../constans/actionTypes.js";

const authReducer = (state = { authData: null, userData: null }, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, userData: action.payload };
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
