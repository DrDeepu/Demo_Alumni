import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
function Example(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <p variant="primary" onClick={handleShow}>
        {props.mail}
      </p>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Alumni : {props.data.firstname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src={props.data.user_profile_image_url}
            width="150px"
            height="150px"
          />
          <br />
          <p>
            <b>FullName</b> :{" "}
            {props.data.firstname + "  " + props.data.lastname}
          </p>
          <p>
            <b>Email</b> : {props.data.email}
          </p>
          <p>
            <b>Phoneno</b> : {props.data.phone}
          </p>
          <p>
            <b>Batch</b> : {props.data.batch}
          </p>
          <p>
            <b>Degree</b> : {props.data.degree}
          </p>
          <p>
            <b>Department</b> : {props.data.department}
          </p>
          <p>
            <b>Valid</b> : {props.data.valid}
          </p>
          <p>
            <b>Company</b> : {props.data.company}{" "}
          </p>
          <p>
            <b>Website</b> : {props.data.website}{" "}
          </p>
          <p>
            <b>Profession</b> :{props.data.profession}{" "}
          </p>
          <p>
            <b>Intrested Domain</b> : {props.data.domain}
          </p>
          <p>
            <b>GitHub Id</b> : {props.data.gitid}{" "}
          </p>
          <p>
            <b>Insta Id</b> : {props.data.instaid}
          </p>
          <p>
            <b>Linkedin Id</b> : {props.data.linkedinid}
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

export default Example;
