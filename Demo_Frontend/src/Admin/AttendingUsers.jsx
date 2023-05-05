/* eslint-disable */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { useEffect } from "react";
import "./Admin.css";
import { Form } from "react-bootstrap";
import axios from "axios";
import { LOCALHOST_URL } from "../config";

function MyVerticallyCenteredModal(props) {
  const [attendingUsers, setAttendingUsers] = React.useState(
    // props.attendingUsers
    []
  );
  async function getAttendingUsers() {
    await axios
      .post(`${LOCALHOST_URL}/get_attending_users`, {
        post_id: props.post_id,
      })
      .then((res) => {
        setAttendingUsers(res.data[0]);
        // console.log(res.data[0]);
      });
  }
  useEffect(() => {
    getAttendingUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <Modal
      {...props}
      //   size="lg"
      style={{ background: "rgba(0,0,0,0.3)" }}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <b>Attending Alumni</b> :{" "}
          {attendingUsers.count > 0 ? attendingUsers.count : 0}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <ul>
            {attendingUsers.count > 0 ? (
              attendingUsers.users.map((values, key) => {
                return (
                  <li key={key}>
                    <span>
                      <img
                        src={values["image_url"]}
                        width="50px"
                        height="50px"
                        alt="User"
                      />
                      Name : {values["first_name"] + " " + values["last_name"]}
                    </span>
                  </li>
                );
              })
            ) : (
              <span>No Attending Users yet. Be the first to attend.</span>
            )}
          </ul>
        </Form>
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
  console.log(props);
  const [modalShow, setModalShow] = React.useState(false);
  // eslint-disable-next-line
  const [checked, setCheckbox] = React.useState(false);
  // console.log(props);
  return (
    <>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Button
          //   type="Button"
          variant="success"
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
        }}
        onShow={() => setCheckbox(true)}
        post_id={props.post_id}
        attendingUsers={props.attendingUsers}
        getAttendingUsers={() => props.getAttendingUsers()}
      />
      {/* {console.log(props)} */}
    </>
  );
}

export default AttendingUsers;
