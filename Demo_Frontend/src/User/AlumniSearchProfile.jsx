import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import SingleAlumni from "../TestPages/Single_User_Hover_Effect";
function AlumniSearchProfile(props) {
  const [show, setShow] = useState(false);

//   console.log(props);
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
          {/* <Image
            src={props.data.user_profile_image_url}
            width="150px"
            height="150px"
          /> */}
          <br />
          <p>
            <b>FullName</b> :{" "}
            {props.userData.firstname + "  " + props.userData.lastname}
          </p>
          <p>
            <b>Email</b> :{props.userData.email}
          </p>
          <p>
            <b>Phoneno</b> :{props.userData.phone}
          </p>
          <p>
            <b>Batch</b> :{props.userData.batch}
          </p>
          <p>
            <b>Degree</b> :{props.userData.degree}
          </p>
          <p>
            <b>Department</b> :{props.userData.department}
          </p>
          <p>
            <b>Company</b> :{props.userData.company}{" "}
          </p>
          <p>
            <b>Website</b> :{props.userData.website}{" "}
          </p>
          <p>
            <b>Profession</b> :{props.userData.profession}{" "}
          </p>
          <p>
            <b>Intrested Domain</b> :{props.userData.domain}
          </p>
          <p>
            <b>GitHub Id</b> :{props.userData.gitid}{" "}
          </p>
          <p>
            <b>Insta Id</b> :{props.userData.instaid}
          </p>
          <p>
            <b>Linkedin Id</b> :{props.userData.linkedinid}
          </p>
        </Modal.Body>
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
