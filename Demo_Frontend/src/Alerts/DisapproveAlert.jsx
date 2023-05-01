import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { LOCALHOST_URL } from "../config";

function Example(props) {
// console.log("=======DISAPPORVECARD", props);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  async function disapproveUser() {
    await axios
      .post(`${LOCALHOST_URL}/disaproveuser`, {
        data: { email: props.data.email },
      })
      .then(() => {
        // window.location.reload()
        props.fetch_all_users();
        props.setRefetch();
      });

    // .then((res) => setResult("true"));
  }
  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ backgroundColor: "black" }}
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
        <Modal.Body>
          Do you really want to deactivate this user account.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              disapproveUser();


            }}
          >
            Deactivate
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
