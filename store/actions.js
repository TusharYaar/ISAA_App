export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_STEP = "SET_STEP";

export const loginUser = (payload) => ({
  type: LOGIN,
  payload,
});

export const setStep = (payload) => ({
  type: SET_STEP,
  payload,
});

export const logout = () => ({
  type: LOGOUT,
});
