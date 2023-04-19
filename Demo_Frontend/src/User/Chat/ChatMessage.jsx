import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { ChatEngine, getOrCreateChat, ChatList } from "react-chat-engine";
import {
  CHAT_ENGINE_API,
  CHAT_ENGINE_API_ME,
  CHAT_PROJECT_ID,
  CHAT_PRIVATE_KEY,
} from "../../config";
import { createChatUser } from "./chat_api";
import "./chat.css";
import Form from "react-bootstrap/Form";
import { Loader } from "../../React-Animations/ReactAnimations";

const DirectChatPage = () => {
  const value = useSelector((state) => state.set_user_profile_data);
  const [userData , setUserData]=React.useState({
    username:value.email,
    password:value.password
  })
  // const CHAT_USERNAME = value.email;
  // const CHAT_SECRET = value.password;

  const [username, setUsername] = React.useState("");

  function createDirectChat(creds) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername("")
    );
  }

  function renderChatForm(creds) {
    return (
      <div>
        <Form.Control
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button id="search_button" onClick={() => createDirectChat(creds)}>
          Search
        </button>
      </div>
    );
  }

  return (
    <>
      <ChatEngine
        height="100vh"
        userName={userData.username}
        userSecret={userData.password}
        // userName={CHAT_USERNAME}
        // userSecret={CHAT_SECRET}
        projectID={CHAT_PROJECT_ID}
        renderNewChatForm={(creds) => renderChatForm(creds)}
        autoConnect={false}
        onConnect={() => {}}
        // renderIceBreaker={(chat) => renderChatForm(chat)}
        // renderChatHeader={(chat) => {
        //   renderChatHeader(chat);
        // }}
      />
    </>
  );
};

// function ChatMessage({ user_name, user_secret }) {
//   const value = useSelector((state) => state.set_user_profile_data);
//   const CHAT_USERNAME = value.email;
//   const CHAT_SECRET = value.password;
//   console.log(value);
//   return (
//     <>
//       <ChatEngine
//         projectID={CHAT_PROJECT_ID}
//         userName={CHAT_USERNAME}
//         height="100vh"
//         userSecret={CHAT_SECRET}
//         offset={6}
//         // renderNewChatForm={(creds) => {}}
//         // renderNewChatForm={(creds) => renderChatForm(creds)}
//       />
//     </>
//   );
// }

// export default ChatMessage;
export default DirectChatPage;
