import { LOGIN, SET_STEP, LOGOUT } from "./actions";
const initialUserState = {
  baseUrl: "https://5764-49-36-37-140.ngrok.io",
  password: "",
  accountNumber: "",
  currentStep: 0,
};

export default (state = initialUserState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, ...payload };
    case LOGOUT:
      return { ...initialUserState };
    case SET_STEP:
      return { ...state, currentStep: payload };

    default:
      return state;
  }
};
