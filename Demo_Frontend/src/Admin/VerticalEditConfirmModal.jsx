// VerticalEditConfirmModal.jsx;

import axios from "axios";
import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function VerticalEditApp(props) {
  const [modalShow, setModalShow] = React.useState(false);

  function VerticalEditConfirmModal(props) {
    return (
      <Modal
        style={{ background: "rgba(0,0,0,0.3)" }}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
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
              saveChangesFunction();
              props.setEdit();

              //   setEdit(false);
            }}
          >
            Sure
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  async function saveChangesFunction() {
    await axios
      .post("http://localhost:5000/update_admin_post", {
        data: {
          post_id: props.post_id,
          post_title: props.title,
          post_image_url: props.image_url,
          post_description: props.description,
          post_event_start_date: props.post_event_start_date,
          post_event_start_time: props.post_event_start_time,
          post_event_end_date: props.post_event_end_date,
          post_event_end_time: props.post_event_end_time,
        },
      })
      .then((res) => {
        // console.log(res);
      });
  }

  return (
    <>
      {props.edit ? (
        <Button
          variant="danger"
          style={{ height: "50px" }}
          onClick={() => {
            setModalShow(true);
          }}
        >
          Done
        </Button>
      ) : (
        <Button
          variant="primary"
          style={{ height: "50px" }}
          onClick={() => {
            props.setEdit();
          }}
        >
          Edit
        </Button>
      )}

      <VerticalEditConfirmModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        setEdit={() => props.setEdit()}
      />
    </>
  );
}
