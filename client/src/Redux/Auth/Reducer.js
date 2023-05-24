import { LOGIN, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ActionType"

const initialState = {
 reqUser: null,
 isAtuh: 'pending',
 login: null
}
export const authReducer = (store = initialState, { type, payload }) => {
 if (type === REGISTER) {
  return {...store, signup:payload}
 }
 else if (type === LOGIN) {
  return {...store, login:payload}
 }
 else if (type === REQ_USER) {
  return {...store, reqUser:payload}
 }
 else if (type === SEARCH_USER) {
  return {...store, searchUser:payload}
 }
 else if (type === UPDATE_USER) {
  return {...store, updatedUser:payload}
 }
 return store
}