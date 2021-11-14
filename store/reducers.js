import { LOGIN } from "./actions";
const initialUserState = {
  password: "",
  encryptedPassword: "",
  accountNumber: "",
};

export default (state = initialUserState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, ...payload };
    default:
      return state;
  }
};
