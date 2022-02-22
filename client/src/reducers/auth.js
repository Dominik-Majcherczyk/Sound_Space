import { AUTH, LOGOUT, FETCH_USER, SET_ERROR } from "../constans/actionTypes.js";

const authReducer = (
  state = { authData: null, userData: null, errors: [] },
  action
) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, userData: action.payload };
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case SET_ERROR:
      console.log(action.payload)
      return { ...state, errors: action.payload };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
