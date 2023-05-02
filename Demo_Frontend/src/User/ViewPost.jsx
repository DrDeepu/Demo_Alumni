/* eslint-disable */
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import ImageLoaderAnimation from "../React-Animations/ImageLoaderAnimation";
import { useSelector } from "react-redux";
import axios from "axios";
import { LOCALHOST_URL } from "../config";
import "./User.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBScrollspy,
} from "mdb-react-ui-kit";

import AttendingUsers from "../Admin/AttendingUsers";

export default function ViewPosts({
  title,
  img_url,
  post_id,
  description,
  post_accept,
  post_decline,
  get_accept_decline,
  accept,
  setAccept,
  start_date,
  end_date,
  start_time,
  end_time,
}) {
  const [show, setShow] = useState(false);
  // eslint-disable-next-line
  const [uploadImage, setUploadImage] = useState(null);
  // eslint-disable-next-line
  const [imageUrl, setImageUrl] = useState(img_url);

  const [comments, setComments] = useState(null);
  const [imageLoader, setImageLoader] = useState(false);
  const [refresher, setRefresher] = useState(true);
  // eslint-disable-next-line
  const [attendingUsers, setAttendingUsers] = React.useState([]);
  const userData = useSelector((state) => state.set_user_profile_data);

  const [data, setData] = useState({
    post_id: post_id,
    comment: null,
  });
  useEffect(() => {
    if (uploadImage !== null) {
      setImageLoader(true);
    }
    get_comment();
    get_accept_decline();
    getAttendingUsers();
    // eslint-disable-next-line
  }, [uploadImage, refresher, accept]);
  async function getAttendingUsers() {
    await axios
      .post(`${LOCALHOST_URL}/get_attending_users`, {
        post_id: post_id,
      })
      .then((res) => {
        setAttendingUsers(res.data[0]);
        // console.log(res.data[0]);
      });
  }
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  async function post_comment() {
    await axios
      .post(`${LOCALHOST_URL}/post_comment`, { data, email: userData.email })
      .then((res) => {
        setRefresher(!refresher);
      })
      .catch((res) => {});
  }
  async function get_comment() {
    await axios.post(`${LOCALHOST_URL}/get_comment`, data).then((res) => {
      setComments(res.data);
    });
  }

  // get_accept_decline();

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ borderRadius: "0px" }}
      >
        View
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton></Modal.Header>
        {/* {error && } */}

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {imageLoader ? (
                <div
                  align="center"
                  style={{
                    backgroundColor: "gray",
                    width: "200px",
                    height: "200px",
                  }}
                >
                  <ImageLoaderAnimation />
                </div>
              ) : (
                <Image
                  src={imageUrl !== null ? imageUrl : ""}
                  style={{ width: "100%", height: "50%" }}
                />
              )}
            </Form.Group>

            <div>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  <b>Post Title</b> :{" "}
                </Form.Label>
                {" " + title}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>
                  <b>Post Description</b> :
                </Form.Label>

                {" " + description}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>
                  <b>Start Date</b> :
                </Form.Label>

                {" " +
                  new Date(start_date).toLocaleDateString() +
                  " at " +
                  start_time}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>
                  <b>End Date</b> :
                </Form.Label>

                {" " +
                  new Date(end_date).toLocaleDateString() +
                  " at " +
                  end_time}
              </Form.Group>
            </div>
          </Form>
          <div style={{ display: "flex" }}>
            {accept !== true ? (
              <Button
                variant="primary"
                onClick={() => {
                  post_accept();
                  setAccept(false);
                }}
                style={{ height: "50px" }}
              >
                Accept
              </Button>
            ) : (
              <Button
                variant="danger"
                onClick={() => {
                  post_decline();

                  setAccept(true);
                }}
                style={{ height: "50px" }}
              >
                Decline
              </Button>
            )}

            {/* {Object.keys(acceptedUsers).length > 0 && (
              )} */}
            <AttendingUsers
              post_id={data.post_id}
              attendingUsers={attendingUsers}
              getAttendingUsers={() => getAttendingUsers()}
            />
            {/* {console.log("__POST__ID__",data.post_id)} */}
          </div>
          <hr />
          <p>
            <b>Comments</b>
          </p>

          <MDBContainer>
            <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
              <img
                src={userData.imageUrl}
                alt="avatar 3"
                style={{ width: "45px", height: "100%" }}
              />
              <input
                type="text"
                class="form-control form-control-lg"
                id="exampleFormControlInput1"
                value={data.comment ? data.comment : ""}
                onChange={(e) => {
                  setData({ ...data, comment: e.target.value });
                }}
              ></input>
              <Button
                className="ms-3"
                onClick={() => {
                  if (
                    data.comment !== null &&
                    data.comment !== "" &&
                    userData.email
                  ) {
                    post_comment();
                    setData({ ...data, comment: "" });
                  }
                }}
              >
                Send
              </Button>
            </MDBCardFooter>
            {/* {console.log(comments)} */}
            {comments ? (
              <MDBRow className="d-flex">
                <MDBCol md="8" lg="6" xl="4">
                  <MDBCard id="chat1" style={{ borderRadius: "15px" }}>
                    <MDBScrollspy
                      // suppressScrollX
                      style={{ position: "relative" }}
                    >
                      <MDBCardBody>
                        {Object.keys(comments).map((item, index) => {
                          return (
                            <>
                              <div className="d-flex flex-row justify-content-start mb-4">
                                <img
                                  src={comments[item]["image_url"]}
                                  alt="avatar 1"
                                  style={{ width: "45px", height: "45px" }}
                                />
                                <div
                                  className="p-3 ms-3"
                                  style={{
                                    borderRadius: "15px",
                                    backgroundColor: "rgba(57, 192, 237,.2)",
                                  }}
                                >
                                  <p className="small mb-0">
                                    {comments[item]["comment_text"]}
                                  </p>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </MDBCardBody>
                    </MDBScrollspy>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            ) : (
              <div>
                <h1>No Comments Yet</h1>
              </div>
            )}
          </MDBContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
