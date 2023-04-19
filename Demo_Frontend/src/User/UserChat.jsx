import React from "react";
import ChatMessage from "./Chat/ChatMessage";
import { useSelector, useDispatch } from "react-redux";
import UserNavBar from "./UserNavBar";

export default function UserChat() {
    const value = useSelector((state) => state.set_user_profile_data);
    const CHAT_USERNAME = value.email;
    const CHAT_SECRET = value.password;

  return (
    <>
      <UserNavBar />
      <ChatMessage />
    </>
  );
}
