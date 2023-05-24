import {  CREATE_STATUS, GET_STATUS_BY_ID } from "./ActionType"

const initialState = {
 
}
export const statusReducer = (store = initialState, { type, payload }) => {
 if (type === CREATE_STATUS) {
  return {...store, createdStatus:payload}
 }
 else if (type === GET_STATUS_BY_ID) {
  return {...store, findById:payload}
 }

 return store
}