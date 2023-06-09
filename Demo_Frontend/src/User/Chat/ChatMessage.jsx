/* eslint-disable */
import React from "react";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";
import { CHAT_PROJECT_ID } from "../../config";
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
    if (!userData.username) setUserData({ username: value.email });
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
          userSecret={userData.username}
          projectID={CHAT_PROJECT_ID}
          renderNewChatForm={(creds) => renderChatForm(creds)}
        />
      )}
    </>
  );
};
export default DirectChatPage;
