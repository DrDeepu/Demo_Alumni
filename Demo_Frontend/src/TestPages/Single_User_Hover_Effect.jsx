import React from "react";
import "./Single_User_Hover_Effect.css";
function Single_User_Hover_Effect(props) {
  console.log(props);
  return (
    <div
      class="profile"
      style={{
        backgroundImage: `url("${props.userData.user_profile_image_url}")`,
      }}
    >
      <div class="overlay">
        <div class="about d-flex flex-column">
          <h4>
            {props.userData.firstname && props.userData.lastname
              ? props.userData.firstname + " " + props.userData.lastname
              : "User"}
          </h4>{" "}
          <span>
            {props.userData.profession
              ? props.userData.profession
              : "Software Developer"}
          </span>
          <span>
            Batch : {props.userData.batch ? props.userData.batch : "year"}
          </span>
        </div>
      </div>
      <div align="center">
        {props.userData.firstname + " " + props.userData.lastname}
      </div>
    </div>
  );
}

export default Single_User_Hover_Effect;
