import { USER_DATA, USER_LOGIN_ID,allquestions } from "./action";

export const setUserData = (data) => ({
  type: USER_DATA,
  payload: data,
});

export const set_allquestions = (data)=>({
  type:allquestions,
  payload:data
})
export const setUserID = (data) => ({
  type: USER_LOGIN_ID,
  payload: data,
});
