import { LOGIN, SET_STEP, LOGOUT } from "./actions";
const initialUserState = {
  password: "",
  encryptedPassword: "",
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
