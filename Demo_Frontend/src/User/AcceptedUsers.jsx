import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { LOCALHOST_URL } from "../config";
import { useEffect, useState } from "react";

function MyVerticallyCenteredModal(props) {
  useEffect(() => {
    get_accepted_users();
  }, []);
  const [acceptedUsers, setAcceptedUsers] = useState([]);
  async function get_accepted_users() {
    await axios.get(`${LOCALHOST_URL}/accept_decline`).then((res) => {
      setAcceptedUsers(res.data);
    });
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Accepted Alumni
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>{}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function AcceptedUsers(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Accepted Alumni
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        props={props}
      />
    </>
  );
}

export default AcceptedUsers;
