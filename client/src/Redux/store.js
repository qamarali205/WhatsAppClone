import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { chatReducer } from "./Chat/Reducer";
import { messageReducer } from "./Message/Reducer";
import { statusReducer } from "./Status/Reducer";

const rootReducer = combineReducers({
 auth: authReducer,
 chat: chatReducer,
 message:messageReducer,
 status:statusReducer,
})

export const store = legacy_createStore(
 rootReducer, applyMiddleware(thunk)
)