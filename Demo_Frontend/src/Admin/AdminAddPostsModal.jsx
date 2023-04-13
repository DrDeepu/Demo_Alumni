import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import axios from "axios";
import ImageLoaderAnimation from "../React-Animations/ImageLoaderAnimation";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SendMail from "./SendMail";
export default function AdminAddPosts({ setRefetch, postsData }) {
  const [show, setShow] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoader, setImageLoader] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [instaCheck, setInstaCheck] = useState(false);
  const [mailCheck, setMailCheck] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (uploadImage !== null) {
      setImageLoader(true);
      uploadPostImage();
    }
  }, [uploadImage]);

  const handleClose = () => {
    setShow(false);
    navigate("/adminposts");
  };
  const handleShow = () => setShow(true);
  const uploadPost = async () => {
    const formData = new FormData();
    formData.append("file", uploadImage);
    formData.append("post_title", postTitle);
    formData.append("post_description", postDescription);
    formData.append("event_start_date", startDate);
    formData.append("event_start_time", startTime);
    formData.append("event_end_date", endDate);
    formData.append("event_end_time", endTime);
    formData.append("insta_check", instaCheck);
    formData.append("mail_check", mailCheck);

    await axios
      .post("http://localhost:5000/upload_admin_post", formData)
      .then((res) => {
        setRefetch();
        navigate("/adminposts");
      });
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
  // function handleDateChange(event) {
  //   const { value } = event.target;
  //   const inputDate = new Date(value);
  //   const today = new Date();

  //   if (inputDate.getTime() > today.getTime()) {
  //     setDate(value);
  //   }
  // }
  function filterLimit(postsData) {
    let dates = [];

    Object.keys(postsData).map((value) => {
      console.log(postsData[value]["post_event_start_date"]);
      console.log(postsData[value]["post_event_end_date"]);
      dates.push({
        start: postsData[value]["post_event_start_date"],
        end: postsData[value]["post_event_end_date"],
      });
    });
    Object.keys(dates).map((values) => {
      console.log(dates[values]);
    });
    console.log(dates);
  }
  // filterLimit(postsData);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add New Post
      </Button>

      <Modal show={show} onHide={handleClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Add New Post</Modal.Title>
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
            <div className="grid grid-cols-2">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="new post title"
                  onChange={(e) => {
                    setPostTitle(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Post Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="new post description"
                  rows={2}
                  onChange={(e) => {
                    setPostDescription(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Event Start Date</Form.Label>
                {/* <Form.Control
                  type="date"
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
                  filterDate={filterLimit(postsData)}
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
                  placeholder="new post description"
                  rows={2}
                  min={startDate}
                  onChange={(e) => {
                    // handleDateChange(e);
                    // setEndDate(e.target.value);
                    console.log("==========FIRST ONE==========", e);
                    console.log(
                      "==========SECOND ONE==========",
                      e.target.value
                    );
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
                  placeholder="new post description"
                  rows={2}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Check
                  type="checkbox"
                  label="Share on Insta as post"
                  onChange={() => {
                    setInstaCheck(!instaCheck);
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                {/* <Form.Check
                  type="checkbox"
                  label="Mail all alumni"
                  onChange={() => {
                    setMailCheck(!mailCheck);
                  }}
                /> */}
                <SendMail
                  mailTrue={() => {
                    setMailCheck(true);
                  }}
                  mailFalse={() => {
                    setMailCheck(false);
                  }}
                />
              </Form.Group>
              {console.log(mailCheck)}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Not Now
          </Button>

          {postTitle === "" ||
          postDescription === "" ||
          imageUrl === null ||
          startDate === "" ||
          startTime === "" ||
          endDate === "" ||
          endTime === "" ? (
            <Button variant="primary" disabled>
              Add Post
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => {
                // handleClose();
                uploadPost();
                handleClose();
                setPostTitle("");
                setPostDescription("");
              }}
            >
              Add Post
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
