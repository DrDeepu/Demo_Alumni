/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
import { LOCALHOST_URL } from "../config";

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
  const mailData = useSelector((state) => state.saveMailData);
  // console.log("========MAILDATA IN ADD POST PAGE=====", mailData);

  const navigate = useNavigate();
  useEffect(() => {
    if (uploadImage !== null) {
      setImageLoader(true);
      uploadPostImage();
    }
  }, [uploadImage]);
  const date = new Date();
  const curDay = date.getDate();
  const curMonth = date.getMonth();
  const curYear = date.getFullYear();
  const minDate = new Date(curYear, curMonth, curDay + 1);
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
    mailCheck === true && formData.append("mailData", JSON.stringify(mailData));

    await axios
      .post(`${LOCALHOST_URL}/upload_admin_post`, formData)
      .then((res) => {
        setRefetch();
        // navigate("/adminposts");
        setMailCheck(false);
      });
  };
  async function uploadPostImage() {
    const formData = new FormData();
    formData.append("file", uploadImage);
    await axios
      .post(`${LOCALHOST_URL}/upload_admin_post_image`, formData)
      .then(async () => {
        await axios
          .get(`${LOCALHOST_URL}/fetch_admin_post_image`)
          .then((res) => {
            setImageUrl(res.data);
            setImageLoader(false);
          });
      });
  }
  function filterLimit(postsData) {
    let dates = [];

    Object.keys(postsData).map((value) => {
      // console.log(postsData[value]["post_event_start_date"]);
      // console.log(postsData[value]["post_event_end_date"]);
      dates.push({
        start: postsData[value]["post_event_start_date"],
        end: postsData[value]["post_event_end_date"],
      });
    });
    Object.keys(dates).map((values) => {
      // console.log(dates[values]);
    });
    // console.log(dates);
  }

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

                <DatePicker
                  selected={startDate}
                  onChange={(e) => {
                    setStartDate(e);
                    setEndDate(e)
                  }}
                  minDate={minDate}
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
                <DatePicker
                  selected={endDate < startDate ? startDate : endDate}
                  onChange={(e) => {
                    setEndDate(e);
                  }}
                  minDate={startDate}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                />

                {new Date(endDate).getTime() <
                  new Date(startDate).getTime() && (
                  <Form.Text className="text-danger">
                    Please enter a valid date.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Event End Time</Form.Label>
                <Form.Control
                  type="time"
                  rows={2}
                  defaultValue={startTime}
                  // minDate = {startTime}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                    // console.log(e.target.value)
                  }}
                />
              </Form.Group>

              {/* <Form.Group
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
              </Form.Group> */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <SendMail
                  mailTrue={() => {
                    setMailCheck(true);
                    // console.log("TRUE");
                  }}
                  mailFalse={() => {
                    setMailCheck(false);
                    // console.log("FALSE");
                  }}
                />
              </Form.Group>
              {/* {console.log(mailCheck)} */}
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
