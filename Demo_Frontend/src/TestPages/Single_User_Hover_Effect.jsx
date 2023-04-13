import React from "react";
import "./Single_User_Hover_Effect.css";
function Single_User_Hover_Effect({ name, profession, image_url }) {
  return (
    // <div class="wrapper">
      <div class="profile" style={{ backgroundImage: `url("${image_url}")` }}>
        <div class="overlay">
          <div class="about d-flex flex-column">
            <h4>{name ? name : "Smitha"}</h4>{" "}
            <span>{profession ? profession : "Software Developer"}</span>
          </div>
          {/* <ul class="social-icons">
            <li>
              <i class="fa fa-facebook"></i>
            </li>
            <li>
              <i class="fa fa-linkedin"></i>
            </li>
            <li>
              <i class="fa fa-twitter"></i>
            </li>
            <li>
              <i class="fa fa-instagram"></i>
            </li>
          </ul> */}
        </div>
      </div>
    // {/* </div> */}
  );
}

export default Single_User_Hover_Effect;
