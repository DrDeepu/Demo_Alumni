import { createStore, combineReducers } from "redux";
import { access_token, set_user_data, set_user_profile_data } from "./reducers";

const rootReducer = combineReducers({
  access_token: access_token,
  set_user_data: set_user_data,
  set_user_profile_data: set_user_profile_data,
});

const store = createStore(rootReducer);

export default store;
