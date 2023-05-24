import { CREATE_SINGLE_CHAT, GET_ALL_CHAT } from "./ActionType"

const initialState = {
 chats:null,
}
export const chatReducer = (store = initialState, { type, payload }) => {
 if (type === CREATE_SINGLE_CHAT) {
  return {...store, singleChat:payload}
 }
 else if (type === GET_ALL_CHAT) {
  return {...store, chats:payload}
 }

 return store
}