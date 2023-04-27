import React from "react";
import { useSelector } from "react-redux";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";
import {
  CHAT_ENGINE_API,
  CHAT_ENGINE_API_ME,
  CHAT_PROJECT_ID,
  CHAT_PRIVATE_KEY,
} from "../../config";
import "./chat.css";
import Form from "react-bootstrap/Form";

const DirectChatPage = ({ value }) => {
  console.log(value);
  const [username, setUsername] = React.useState("");
  const [userData, setUserData] = React.useState({
    username: value.email,
    password: value.firstName + value.lastName,
  });

  React.useEffect(() => {
    if (!userData.username)
      setUserData({ username: value.email, password: value.password });
  }, [userData]);
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
          placeholder="Enter email address"
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
      {console.log(userData)}
      {userData.username && (
        <ChatEngine
          height="100vh"
          userName={userData.username}
          userSecret={userData.password}
          projectID={CHAT_PROJECT_ID}
          renderNewChatForm={(creds) => renderChatForm(creds)}
        />
      )}
    </>
  );
};
export default DirectChatPage;
