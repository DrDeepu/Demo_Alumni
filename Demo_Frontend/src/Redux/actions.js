/* eslint-disable */
import axios from "axios";
import { LOCALHOST_URL } from "../config";

export function store_access_token(access_token) {
  return { type: "store_token", payload: access_token };
}

export function store_user_email(access_token) {
  return { type: "store_user_email", payload: access_token };
}

export function store_user_profile_data(data) {
  // console.log('--------- DATA IN ACTION', data);
  return { type: "set_user_profile_data", payload: data };
}

export function getAllUsers() {
  return (dispatch) => {
    axios
      .get(`${LOCALHOST_URL}/all_users`)
      .then((res) => {
        dispatch({ type: "setAllUsersError", payload: res.data });
      })
      .catch((res) => {
        dispatch({ type: "setAllUsersError", payload: res.data });
      });
  };
}

export function saveMailData(mailData) {
  // console.log('ACTIONS======',mailData)
  return { type: "setMailData", mailData };
}
