/* eslint-disable */
import React from "react";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div id="page_not_found_blur_animation">
        <div
          style={{
            alignItems: "center",
            backgroundColor: "black",
            color: "white",
            width: "100%",
            height: "100vh",
          }}
        >
          <div style={{ paddingTop: "250px", paddingLeft: "550px" }}>
            <p>Page not found so please redirect to the next page possible.</p>
            <button>
              <NavLink to="/login">Home</NavLink>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
