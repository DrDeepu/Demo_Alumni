import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import ImageLoaderAnimation from "../React-Animations/ImageLoaderAnimation";
import { useSelector, useDispatch } from "react-redux";
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
  MDBIcon,
  MDBBtn,
  MDBScrollspy,
} from "mdb-react-ui-kit";
import { Alert } from "../Alerts/Toast";
import AcceptedUsers from "./AcceptedUsers";

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
}) {
  const [show, setShow] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(img_url);
  const [comments, setComments] = useState(null);
  const [imageLoader, setImageLoader] = useState(false);
  const [refresher, setRefresher] = useState(true);
  const [acceptedUsers, setAcceptedUsers] = useState({});
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
  }, [uploadImage, refresher, accept]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  async function post_comment() {
    await axios
      .post(`${LOCALHOST_URL}/post_comment`, { data, email: userData.email })
      .then((res) => {
        setRefresher(!refresher);
        // console.log(res);
      })
      .catch((res) => {
        // console.log("ERRORR ");
      });
  }
  async function get_comment() {
    await axios.post(`${LOCALHOST_URL}/get_comment`, data).then((res) => {
      setComments(res.data);
    });
  }

  // get_accept_decline();

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View
      </Button>

      <Modal show={show} onHide={handleClose} fullscreen>
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
                  style={{ width: "200px", height: "200px" }}
                />
              )}
            </Form.Group>

            <div>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Post Title : </Form.Label>
                {" " + title}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Post Description :</Form.Label>

                {" " + description}
              </Form.Group>
            </div>
          </Form>
          <div className="grid grid-cols-8 ">
            {accept !== true ? (
              <Button
                className="primary"
                onClick={() => {
                  post_accept();
                  setAccept(false);
                }}
              >
                Accept
              </Button>
            ) : (
              <Button
                className="secondary"
                onClick={() => {
                  post_decline();
                  setAccept(true);
                }}
              >
                Decline
              </Button>
            )}

            {Object.keys(acceptedUsers).length > 0 && (
              <AcceptedUsers post_id={data.post_id} />
            )}
          </div>
          <hr />
          <p>Comments</p>

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
                      style={{ position: "relative", height: "400px" }}
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
