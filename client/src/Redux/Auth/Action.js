import { BASE_URL } from "../../Config/Api";
import { LOGIN, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ActionType";



export const register = (data) => async (dispatch) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const user = await res.json();
  console.log("register",user)
  if (user.token) localStorage.setItem("token", user.token);
  dispatch({ type: REGISTER, payload: user });
};

export const login = (data) => async (dispatch) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const user = await res.json();
  if (user.token) localStorage.setItem("token", user.token);
  
  dispatch({ type: LOGIN, payload: user });
};

export const currentUser = (token) => async (dispatch) => {
  const res = await fetch(
    `${BASE_URL}/users/currentUser`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const user = await res.json();

 dispatch({type:REQ_USER, payload:user})
};


export const searchUser = (data) => async (dispatch) => {
  const res = await fetch(
    `${BASE_URL}/users?search=${data.keyword}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const user = await res.json();

  const temp=user.filter((item)=>item._id!==data.userId)
 dispatch({type:SEARCH_USER, payload:temp})
};

export const updateUser = (data) => async (dispatch) => {
  
  const res = await fetch(
    `${BASE_URL}/users/edit/${data.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body:JSON.stringify(data.data)
    }
  );
  const user = await res.json();
console.log("updated user",user)
 dispatch({type:UPDATE_USER, payload:user})
};
