import jwt_decode from "jwt-decode";
import axios from "axios";
import { LOCALHOST_URL } from "../config";

const token = localStorage.getItem("access_token");
const access_token_initialState = {
  access_token: token ? token : null,
  // access_token: localStorage.getItem("access_token"),
};

export const access_token = (state = access_token_initialState, action) => {
  // console.log("Payload in reducers file", action);
  switch (action.type) {
    case "store_token":
      localStorage.setItem("access_token", action.payload);
      return { access_token: localStorage.getItem(action.payload) };
    default:
      return state;
  }
};

const set_user_data_initialState = {
  user_email: token
    ? jwt_decode(localStorage.getItem("access_token")).sub
    : null,
};
export const set_user_data = (state = set_user_data_initialState, action) => {
  switch (action.type) {
    case "store_user_email":
      const user_email =
        localStorage.getItem("access_token") !== ""
          ? jwt_decode(localStorage.getItem("access_token")).sub
          : "";
      return { user_email: user_email };
    default:
      return state;
  }
};

const set_user_profile_data_initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  instaid: "",
  linkedinId: "",
  githubId: "",
  domain: "",
  profession: "",
  company: "",
  websiteUrl: "",
  imageUrl: "",
};

export const set_user_profile_data = (
  state = set_user_profile_data_initialState,
  action
) => {
  switch (action.type) {
    case "set_user_profile_data":
      const firstName = action.payload.firstName;
      const lastName = action.payload.lastName;
      const email = action.payload.email;
      const phone = action.payload.phone;
      const password = action.payload.password;
      const instaId = action.payload.instaId;
      const linkedinId = action.payload.linkedinId;
      const githubId = action.payload.githubId;
      const domain = action.payload.domain;
      const profession = action.payload.profession;
      const company = action.payload.company;
      const websiteUrl = action.payload.websiteUrl;
      const imageUrl = action.payload.imageUrl;

      // console.log("SET_USER_PROFILE_DATA_REDUCER", action.payload);
      return {
        firstName,
        lastName,
        email,
        phone,
        password,
        instaId,
        linkedinId,
        githubId,
        domain,
        profession,
        company,
        websiteUrl,
        imageUrl,
      };
    default:
      return state;
  }
};

