import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function Example(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  async function deleteUser() {
    await axios
      .post("http://localhost:5000/deleteuser", {
        data: { email: props.data.email },
      })
      .then(
        () => {
          props.fetch_all_users();
        }
        // window.location.reload()
      );
  }
  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ backgroundColor: "red" }}
      >
        {props.value}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {props.data.firstname + " " + props.data.lastname}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete this user account.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              deleteUser();
              props.setRefetch();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
