import React from "react";
import "./MainHomePage.css";
import { NavLink } from "react-router-dom";

const TestHomePage = () => {
  return (
    <>
      <div id="body">
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:100"
          rel="stylesheet"
        />
        <p id="head1" className="header">
          Welcome Alumni
        </p>
        <p id="head2" className="header">
          Website
        </p>
        <p id="head3" className="header">
          For you
        </p>

        <p id="head4" className="header">
          Welcome to Alumni Network
        </p>
        <NavLink to="/login">
          <button id="button">Join Us</button>
        </NavLink>
        <div className="light x1"></div>
        <div className="light x2"></div>
        <div className="light x3"></div>
        <div className="light x4"></div>
        <div className="light x5"></div>
        <div className="light x6"></div>
        <div className="light x7"></div>
        <div className="light x8"></div>
        <div className="light x9"></div>
      </div>
    </>
  );
};
export default TestHomePage;
