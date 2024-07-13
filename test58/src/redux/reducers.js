import { USER_DATA, USER_LOGIN_ID,allquestions } from "./action";

let initialState = {
  userData: {},
  userLoginId: "",
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return { ...state, userData: action.payload };
    case allquestions:
      return { ...state, allquestions: action.payload };
    case USER_LOGIN_ID:
      return { ...state, userLoginId: action.payload };
    default:
      return state;
  }
};
