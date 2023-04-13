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
          <p>FullName : {props.data.firstname + "  " + props.data.lastname}</p>
          <p>Email : {props.data.email}</p>
          <p>Phoneno : {props.data.phone}</p>
          <p>Batch : {props.data.batch}</p>
          <p>Degree : {props.data.degree}</p>
          <p>Department : {props.data.Department}</p>
          <p>Valid : {props.data.valid}</p>
          <p>Company : {props.data.company} </p>
          <p>Website : {props.data.website} </p>
          <p>Profession :{props.data.profession} </p>
          <p>Intrested Domain : {props.data.domain}</p>
          <p>GitHub Id : {props.data.gitid} </p>
          <p>Insta Id : {props.data.instaid}</p>
          <p>Linkedin Id : {props.data.linkedinid}</p>
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
