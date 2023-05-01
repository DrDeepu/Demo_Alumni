// VerticalEditConfirmModal.jsx;
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
              //   saveChangesFunction();
              //   props.setEdit();
              props.props.saveProfile();
              //   setEdit(false);
            }}
          >
            Sure
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  //   async function saveChangesFunction() {
  //     await axios
  //       .post(`${LOCALHOST_URL}/update_admin_post`, {
  //         data: {
  //           post_id: props.post_id,
  //           post_title: props.title,
  //           post_image_url: props.image_url,
  //           post_description: props.description,
  //           post_event_start_date: props.post_event_start_date,
  //           post_event_start_time: props.post_event_start_time,
  //           post_event_end_date: props.post_event_end_date,
  //           post_event_end_time: props.post_event_end_time,
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res);
  //       });
  //   }

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
        // setEdit={() => props.setEdit()}
      />
    </>
  );
}
