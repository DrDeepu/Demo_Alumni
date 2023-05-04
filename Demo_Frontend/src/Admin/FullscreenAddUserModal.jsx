/* eslint-disable */
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { NavLink } from "react-router-dom";

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
          <Modal.Title>
            <b>{props.data.firstname + " " + props.data.lastname}</b>
          </Modal.Title>
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
          {props.data.phone && (
            <p>
              <b>Phoneno</b> : {"  "}
              {props.data.phone}
            </p>
          )}
          <p>
            <b>Batch</b> : {"  "}
            {props.data.batch}
          </p>
          {/* <p>
            <b>Degree</b> : {"  "}
            {props.data.degree}
          </p> */}
          <p>
            <b>Department</b> : {"  "}
            {props.data.department}
          </p>
          <p>
            <b>Valid</b> : {"   "}
            {props.data.valid}
          </p>
          {props.data.company && (
            <p>
              <b>Company</b> : {"  "}
              {props.data.company}
            </p>
          )}
          {props.data.profession && (
            <p>
              <b>Profession</b> :{"  "}
              {props.data.profession}
            </p>
          )}
          {props.data.domain && (
            <p>
              <b>Intrested Domain</b> : {props.data.domain}
            </p>
          )}
          {props.data.website && (
            <p>
              <b>Website</b> : {"   "}
              <NavLink
                to={`http://www.${props.data.website}.com`}
                target="_blank"
              >
                {props.data.website}{" "}
              </NavLink>
            </p>
          )}
          {props.data.gitid && (
            <p>
              <b>GitHub Id</b> : {"  "}
              <NavLink
                to={`https://github.com/${props.data.gitid}`}
                target="_blank"
              >
                {props.data.gitid}
              </NavLink>
            </p>
          )}
          {props.data.instaid && (
            <p>
              <b>Insta Id</b> :{"   "}
              <NavLink
                to={`https://instagram.com/${props.data.instaid}`}
                target="_blank"
              >
                {props.data.instaid}
              </NavLink>
            </p>
          )}
          {props.data.linkedinid && (
            <p>
              <b>Linkedin Id</b> :{"  "}
              <NavLink
                to={`https://linkedin/in/${props.data.linkedinid}`}
                target="_blank"
              >
                {" "}
                {props.data.linkedinid}
              </NavLink>
            </p>
          )}
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
