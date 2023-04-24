import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { useState, useEffect } from "react";
import "./Admin.css";

import { getAllUsers, saveMailData } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, FormControl } from "react-bootstrap";

function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <Modal
      {...props}
    //   size="lg"
    style={{background:"rgba(0,0,0,0.3)"}}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Total Alumni : 0
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form></Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onHide();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function AttendingUsers(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [checked, setCheckbox] = React.useState(false);
  // console.log(props);
  return (
    <>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Button
          //   type="Button"
          variant="secondary"
          style={{ height: "50px" }}
          label="Mail Alumni"
          onClick={() => {
            setModalShow(true);
          }}
        >
          Attending Alumni
        </Button>
      </Form.Group>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          // props.mailFalse();
        }}
        onShow={() => setCheckbox(true)}
      />
    </>
  );
}

export default AttendingUsers;
