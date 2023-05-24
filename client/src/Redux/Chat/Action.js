import { BASE_URL } from "../../Config/Api";
import { CREATE_SINGLE_CHAT, GET_ALL_CHAT } from "./ActionType";

export const createSingleChat = (data) => async(dispatch) => {
 const res = await fetch(`${BASE_URL}/chats/new`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${data.token}`,
      },
      body:JSON.stringify({userId:data.userId})
    }
    )
 const chat = await res.json();
 dispatch({type:CREATE_SINGLE_CHAT, payload:chat})
}

export const getAllChat = (token) => async(dispatch) => {
 const res = await fetch(`${BASE_URL}/chats/getall`, {
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      }
    });
    const chats = await res.json();
  
 dispatch({type:GET_ALL_CHAT, payload:chats})
}
