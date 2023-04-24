import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import axios from "axios";
import ImageLoaderAnimation from "../React-Animations/ImageLoaderAnimation";
import VerticalEditApp from "./VerticalEditConfirmModal";
import { LOCALHOST_URL } from "../config";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBBtn,
  MDBScrollspy,
} from "mdb-react-ui-kit";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AttendingUsers from "./AttendingUsers";
export default function ViewAdminPosts({
  title,
  img_url,
  post_id,
  description,
  post_event_start_date,
  post_event_start_time,
  post_event_end_date,
  post_event_end_time,
}) {
  const [show, setShow] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(img_url);
  const [imageLoader, setImageLoader] = useState(false);
  const [postTitle, setPostTitle] = useState(title);
  const [startDate, setStartDate] = useState(new Date(post_event_start_date));
  const [startTime, setStartTime] = useState(post_event_start_time);
  const [endDate, setEndDate] = useState(new Date(post_event_end_date));
  const [endTime, setEndTime] = useState(post_event_end_time);
  const [edit, setEdit] = useState(false);
  const [postDescription, setPostDescription] = useState(description);
  const [refresher, setRefresher] = useState(true);
  const [comments, setComments] = useState(null);
  const [data, setData] = useState({
    post_id: post_id,
    comment: null,
  });

  useEffect(() => {
    if (uploadImage !== null) {
      setImageLoader(true);
      uploadPostImage();
    }
    get_comment();
  }, [uploadImage, refresher]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const uploadPost = async () => {
    const formData = new FormData();
    formData.append("file", uploadImage);
    formData.append("post_title", postTitle);
    formData.append("post_description", postDescription);
    formData.append("post_event_start_date", startDate);
    formData.append("post_event_start_time", startTime);
    formData.append("post_event_end_date", endDate);
    formData.append("post_event_end_time", endTime);

    await axios.post("http://localhost:5000/upload_admin_post", formData);
    //   .then(async () => {
    //     await axios
    //       .get("http://localhost:5000/fetch_admin_post")
    //       .then((res) => {
    //         setImageUrl(res.data);
    //       });
    //   });
  };

  async function uploadPostImage() {
    const formData = new FormData();
    formData.append("file", uploadImage);
    await axios
      .post("http://localhost:5000/upload_admin_post_image", formData)
      .then(async () => {
        await axios
          .get("http://localhost:5000/fetch_admin_post_image")
          .then((res) => {
            setImageUrl(res.data);
            setImageLoader(false);
          });
      });
  }
  function setEditFunction() {
    setEdit(!edit);
  }
  async function post_comment() {
    await axios
      .post(`${LOCALHOST_URL}/post_comment`, { data, email: "admin@email.com" })
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

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Edit: <b>{title}</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Preview Image</Form.Label> */}
              {imageLoader ? (
                <div
                  align="center"
                  style={{
                    backgroundColor: "gray",
                    width: "100%",
                    height: "20%x",
                  }}
                >
                  <ImageLoaderAnimation />
                </div>
              ) : (
                <Image
                  src={imageUrl !== null ? imageUrl : ""}
                  //   src={image_url !== null ? image_url : ""}
                  style={{ width: "100%", height: "20%" }}
                />
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Choose Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={(e) => {
                  setUploadImage(e.target.files[0]);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Post Title</Form.Label>

              <Form.Control
                disabled={edit ? false : true}
                type="text"
                placeholder="new post title"
                onChange={(e) => {
                  setPostTitle(e.target.value);
                }}
                defaultValue={title}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Post Description</Form.Label>

              <Form.Control
                disabled={edit ? false : true}
                as="textarea"
                defaultValue={description}
                rows={3}
                onChange={(e) => {
                  setPostDescription(e.target.value);
                }}
              />
            </Form.Group>
            <div className="grid grid-cols-2">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Event Start Date</Form.Label>
                {/* <Form.Control
                  type="date"
                  defaultValue={startDate}
                  placeholder="new post description"
                  rows={2}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    // handleDateChange(e);
                    setStartDate(e.target.value);
                  }}
                /> */}
                <DatePicker
                  selected={startDate}
                  onChange={(e) => {
                    setStartDate(e);
                  }}
                  minDate={new Date()}
                  // filterDate={isDateBlocked}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                />

                {new Date(startDate).getTime() <= new Date().getTime() && (
                  <Form.Text className="text-danger">
                    Please enter a valid date.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Event Start Time</Form.Label>
                <Form.Control
                  type="time"
                  defaultValue={startTime}
                  placeholder="new post description"
                  rows={2}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Event End Date</Form.Label>
                {/* <Form.Control
                  type="date"
                  defaultValue={endDate}
                  placeholder="new post description"
                  rows={2}
                  min={startDate}
                  onChange={(e) => {
                    // handleDateChange(e);
                    setEndDate(e.target.value);
                  }}
                /> */}
                <DatePicker
                  selected={endDate < startDate ? startDate : endDate}
                  onChange={(e) => {
                    setEndDate(e);
                  }}
                  minDate={startDate}
                  // value={selectedDate}
                  // filterDate={isDateBlocked}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                />

                {
                  // new Date(endDate).getTime() <= new Date().getTime() &&
                  new Date(endDate).getTime() <
                    new Date(startDate).getTime() && (
                    <Form.Text className="text-danger">
                      Please enter a valid date.
                    </Form.Text>
                  )
                }
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Event End Time</Form.Label>
                <Form.Control
                  type="time"
                  defaultValue={endTime}
                  placeholder="new post description"
                  rows={2}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
                />
              </Form.Group>
            </div>
            <div style={{ display: "flex" }}>
              <VerticalEditApp

                title={postTitle}
                description={postDescription}
                image_url={imageUrl}
                post_id={post_id}
                post_event_start_date={startDate}
                post_event_start_time={startTime}
                post_event_end_date={endDate}
                post_event_end_time={endTime}
                setEdit={() => {
                  setEditFunction();
                }}
                edit={edit}
              />
              <AttendingUsers />
            </div>
          </Form>
          <hr />
          <p>Comments</p>

          <MDBContainer>
            <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
              <img
                src={
                  "https://res.cloudinary.com/dy59sbjqc/image/upload/v1681198081/Users/person-donald-900x1080_ctmwek.jpg"
                }
                alt="avatar 3"
                style={{ width: "45px", height: "100%", marginRight: "5%" }}
              />
              <input
                type="text"
                className="form-control form-control-lg"
                id="exampleFormControlInput1"
                value={data.comment ? data.comment : ""}
                onChange={(e) => {
                  setData({ ...data, comment: e.target.value });
                }}
              ></input>
              <Button
                className="ms-3"
                onClick={() => {
                  if (data.comment !== null && data.comment !== "") {
                    post_comment();
                    setData({ ...data, comment: "" });
                  }
                }}
              >
                {/* <a className="ms-3" href="#!"> */}
                {/* <MDBIcon fas icon="paper-plane" /> */}
                Send
                {/* </a> */}
              </Button>
            </MDBCardFooter>
            {comments ? (
              <MDBRow className="d-flex">
                <MDBCol md="8" lg="6" xl="4">
                  <MDBCard id="chat1" style={{ borderRadius: "15px" }}>
                    <MDBScrollspy
                      // suppressScrollX
                      style={{ position: "relative" }}
                    >
                      <MDBCardBody>
                        {Object.keys(comments)
                          .reverse()
                          .map((item, index) => (
                            <>
                              <div className="d-flex flex-row justify-content-start mb-4">
                                <img
                                  src={comments[item]["image_url"]}
                                  alt="avatar 1"
                                  style={{
                                    width: "45px",
                                    height: "45px",
                                  }}
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
                          ))}
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
          <Button
            variant="secondary"
            onClick={handleClose}
            // onClickCapture={() => window.location.reload()}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
