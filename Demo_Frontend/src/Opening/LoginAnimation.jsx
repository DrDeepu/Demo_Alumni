import React from "react";
import ReactAnimations from "../React-Animations/ReactAnimations";
import "./Login.css";

const LoginAnimation = () => {
  return (
    <div id={10 < 15 ? "loading_div_on" : "loading_div_off"} align="center">
      <ReactAnimations />
    </div>
  );
};

export default LoginAnimation;
