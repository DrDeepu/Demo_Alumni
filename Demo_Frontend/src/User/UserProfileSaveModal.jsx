// VerticalEditConfirmModal.jsx;
/* eslint-disable */
import "./User.css";
import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function VerticalEditApp(props) {
  const [modalShow, setModalShow] = React.useState(false);

  function VerticalEditConfirmModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="background_dim"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Save Changes
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Click sure to save changes</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              props.onHide();
            }}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              props.onHide();
              props.props.saveProfile();
            }}
          >
            Sure
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <Button
        variant="danger"
        onClick={() => {
          setModalShow(true);
        }}
      >
        Save
      </Button>

      <VerticalEditConfirmModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        props={props}
      />
    </>
  );
}
