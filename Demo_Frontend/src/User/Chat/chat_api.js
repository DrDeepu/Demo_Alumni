import axios from "axios";
import {
  CHAT_PRIVATE_KEY,
  CHAT_ENGINE_API,
  CHAT_ENGINE_API_ME,
  CHAT_PROJECT_ID,
} from "../../config";

export const createChatUser = async (username, secret, firstName, lastName) => {
  var FormData = require("form-data");
  var data = new FormData();
  data.append("username", username);
  data.append("secret", secret);
  data.append("first_name", firstName);
  data.append("last_name", lastName);
  await axios({
    method: "post",
    url: CHAT_ENGINE_API,
    data: data,
    headers: {
      "PRIVATE-KEY": CHAT_PRIVATE_KEY,
      //   ...data.getHeaders(),
    },
  })
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      // console.log(error);
    });
};
//   createChatUser();

export async function getChatUsers() {
  await axios({
    method: "get",
    url: CHAT_ENGINE_API,
    headers: {
      "PRIVATE-KEY": CHAT_PRIVATE_KEY,
      //   ...data.getHeaders(),
    },
  }).then(function (response) {
    // console.log(JSON.stringify(response.data));
  });
}
// getChatUsers();

export async function putChatUsers(username, secret) {
  var FormData = require("form-data");
  var data = new FormData();
  data.append("username", username);
  data.append("secret", secret);
  await axios({
    method: "put",
    url: CHAT_ENGINE_API,
    data: data,
    headers: {
      "PRIVATE-KEY": CHAT_PRIVATE_KEY,
      //   ...data.getHeaders(),
    },
  });
  // .then((res) =>
  // console.log(res));
}
// putChatUsers("rahuls", "email1");

export async function getChatUser(id) {
  await axios({
    method: "get",
    url: `${CHAT_ENGINE_API}${id}/`,
    headers: {
      "PRIVATE-KEY": CHAT_PRIVATE_KEY,
      //   ...data.getHeaders(),
    },
  })
  // .then((res) => console.log(res));
}

// getChatUser(258793);

export async function patchCharUser(
  id,
  username,
  email,
  secret,
  first_name,
  last_name
) {
  var FormData = require("form-data");
  var data = new FormData();
  data.append("username", username);
  data.append("email", email);
  data.append("secret", secret);
  data.append("first_name", first_name);
  data.append("last_name", last_name);

  await axios({
    method: "patch",
    url: `${CHAT_ENGINE_API}${id}`,
    data: data,
    headers: {
      "PRIVATE-KEY": CHAT_PRIVATE_KEY,
    },
  }).then(function (response) {
    // console.log(JSON.stringify(response.data));
  });
}
//  patchCharUser(
//    258793,
//    "AdminDeepu",
//    "deepukumar.pu@outlook.com",
//    "email1",
//    "Deepu",
//    "Admin"
//  );

export async function deleteChatUser(id) {
  // https://api.chatengine.io/users/{{user_id}}/
  await axios({
    method: "delete",
    url: `${CHAT_ENGINE_API}${id}`,
    headers: {
      "PRIVATE-KEY": CHAT_PRIVATE_KEY,
    },
  }).then(function (response) {
    // console.log(JSON.stringify(response.data));
  });
}
//   deleteChatUser(258822)

export async function isChatProjectAuthenticated(
  project_id,
  user_name,
  user_secret
) {
  await axios({
    method: "get",
    url: `${CHAT_ENGINE_API_ME}`,
    headers: {
      "Project-ID": `${project_id}`,
      "User-Name": `${user_name}`,
      "User-Secret": `${user_secret}`,
    },
  });
  // .then((res) => console.log(res));
}
// isChatProjectAuthenticated(CHAT_PROJECT_ID, "AdminDeepu", "email1");

export async function updateMyChatAccount(
  project_id,
  user_name,
  user_secret,
  username,
  email,
  // secret,
  first_name,
  last_name
) {
  var FormData = require("form-data");
  var data = new FormData();
  data.append("username", username);
  data.append("email", email);
  // data.append("secret", secret);
  data.append("first_name", first_name);
  data.append("last_name", last_name);
  await axios({
    method: "patch",
    url: `${CHAT_ENGINE_API_ME}`,
    data: data,
    headers: {
      "Project-ID": `${project_id}`,
      "User-Name": `${user_name}`,
      "User-Secret": `${user_secret}`,
    },
  })
  // .then((res) => console.log(res));
}
//   updateMyChatAccount(
//     CHAT_PROJECT_ID,
//     "Admin",
//     "email1",
//     "Admin",
//     "deepukumarpu@outlook.com",
//     "Admin",
//     "DeepuKumar"
//   );

export async function deleteMyAccount(user_name, user_password) {
  await axios({
    method: "delete",
    url: `${CHAT_ENGINE_API_ME}`,
    headers: {
      "Project-ID": `${CHAT_PROJECT_ID}`,
      "User-Name": `${user_name}`,
      "User-Secret": `${user_password}`,
    },
  });
}
// deleteMyAccount('DeepuKumar','email1')
