import { BASE_URL } from "../../Config/Api";
import { GET_STATUS_BY_ID } from "./ActionType";

export const findStatusById = (data) => async (dispatch) => {
 
    const res = await fetch(
      `${BASE_URL}/status/${data.statusId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    const status = await res.json();
  
    dispatch({ type: GET_STATUS_BY_ID, payload: status });
  };

  export const createStatusAction = (data) => async (dispatch) => {
 
    const res = await fetch(
      `${BASE_URL}/status`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body:JSON.stringify(data.data)
      }
    );
    const status = await res.json();
  
    dispatch({ type: GET_STATUS_BY_ID, payload: status });
  };