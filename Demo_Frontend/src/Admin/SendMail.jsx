import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import Form from "react-bootstrap/Form";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select Alumni
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
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

function SendMail(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [checked, setCheckbox] = React.useState(true);

  return (
    <>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Check
          type="checkbox"
        //   checked={checked}
          label="Mail Alumni"
          onChange={(e) => {
            // setMailCheck(!mailCheck);
            e.target.checked && setModalShow(true);
            // e.target.checked && setCheckbox(true);
            // !e.target.checked && setCheckbox(false);
            e.target.checked && props.mailTrue();
            !e.target.checked && props.mailFalse();

            // console.log(e);
          }}
        />
        {/* <SendMail /> */}
      </Form.Group>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        mail={() => props.mail()}
      />
    </>
  );
}

export default SendMail;
