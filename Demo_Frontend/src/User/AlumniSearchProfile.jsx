/* eslint-disable */
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SingleAlumni from "../TestPages/Single_User_Hover_Effect";
import { NavLink } from "react-router-dom";
import Image from "react-bootstrap/Image";

function AlumniSearchProfile(props) {
  const [show, setShow] = useState(false);

  // console.log(props);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <p variant="primary" onClick={handleShow}>
        {props.mail}

        <SingleAlumni userData={props.userData} />
      </p>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Alumni : {props.userData.firstname + " " + props.userData.lastname}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src={props.userData.user_profile_image_url}
            width="150px"
            height="150px"
          />
          <br />
          <p>
            <b>FullName</b> :{" "}
            {props.userData.firstname + "  " + props.userData.lastname}
          </p>
          <p>
            <b>Email</b> :{props.userData.email}
          </p>
          {props.userData.phone && (
            <p>
              <b>Phoneno</b> :{props.userData.phone}
            </p>
          )}
          {props.userData.batch && (
            <p>
              <b>Batch</b> :{props.userData.batch}
            </p>
          )}
          {props.userData.degree && (
            <p>
              <b>Degree</b> :{props.userData.degree}
            </p>
          )}
          {props.userData.department && (
            <p>
              <b>Department</b> :{props.userData.department}
            </p>
          )}
          {props.userData.company && (
            <p>
              <b>Company</b> :{props.userData.company}{" "}
            </p>
          )}
          {props.userData.website && (
            <p>
              <b>Website</b> :{props.userData.website}{" "}
            </p>
          )}
          {props.userData.profession && (
            <p>
              <b>Profession</b> :{props.userData.profession}{" "}
            </p>
          )}
          {props.userData.domain && (
            <p>
              <b>Intrested Domain</b> :{props.userData.domain}
            </p>
          )}
          {props.userData.gitid && (
            <p>
              <b>GitHub Id</b> :{props.userData.gitid}{" "}
            </p>
          )}
          {props.userData.instaid && (
            <p>
              <b>Insta Id</b> :
              {
                <NavLink
                  to={`https://instagram.com/${props.userData.instaid}`}
                  target="_blank"
                >
                  {props.userData.instaid}
                </NavLink>
              }
            </p>
          )}
          {props.userData.linkedinid && (
            <p>
              <b>Linkedin Id</b> :
              {
                <NavLink
                  to={`https://linkedin/in/${props.userData.linkedinid}`}
                  target="_blank"
                >
                  {" "}
                  {props.userData.linkedinid}
                </NavLink>
              }
            </p>
          )}
        </Modal.Body>
        <F />
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export function Single_User_Hover_Effect({ name, profession, image_url }) {
  return (
    // <div class="wrapper">
    <div class="profile" style={{ backgroundImage: `url("${image_url}")` }}>
      <div class="overlay">
        <div class="about d-flex flex-column">
          <h4>{name ? name : "Smitha"}</h4>{" "}
          <span>{profession ? profession : "Software Developer"}</span>
        </div>
      </div>
    </div>
    // {/* </div> */}
  );
}

export default AlumniSearchProfile;
function F() {
  const [countValue, setCountValue] = React.useState(0);
  const time = 3;
  const total = 200;
  const timeDuration = time / total;
  setTimeout(() => {
    countValue <= total && setCountValue(countValue + 1);
  }, timeDuration * 100);
  return <h1>{countValue}</h1>;
}
