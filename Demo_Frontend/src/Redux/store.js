/* eslint-disable */
import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  getAllUsers,
  saveMailData,
  access_token,
  set_user_data,
  set_user_profile_data,
} from "./reducers";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  access_token,
  set_user_data,
  set_user_profile_data,
  getAllUsers,
  saveMailData,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
