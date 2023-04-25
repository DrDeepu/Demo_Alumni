import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import axios from "axios";
import ImageLoaderAnimation from "../React-Animations/ImageLoaderAnimation";
import UserProfileSaveModal from "./UserProfileSaveModal";
import { LOCALHOST_URL } from "../config";
import { useSelector } from "react-redux";

export default function User(props) {
  const access_token = useSelector((state) => state.access_token.access_token);
  const [show, setShow] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [imageLoader, setImageLoader] = useState(false);
  // console.log(props.userData.email);
  const initialState = {
    firstName: props.userData.firstName,
    lastName: props.userData.lastName,
    email: props.userData.email,
    phoneNumber: props.userData.phone,
    batch: props.userData.batch,
    department: props.userData.department,
    instagramId: props.userData.instaId,
    linkedinId: props.userData.linkedinId,
    githubId: props.userData.githubId,
    domain: props.userData.domain,
    websiteUrl: props.userData.websiteUrl,
    imageUrl: props.userData.imageUrl,
    profession: props.userData.profession,
    companyName: props.userData.company,
  };
  const [userData, setUserData] = useState(initialState);
  useEffect(() => {
    if (uploadImage !== null) {
      setImageLoader(true);
      uploadPostImage();
    }
  }, [uploadImage]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function uploadPostImage() {
    const formData = new FormData();
    formData.append("file", uploadImage);
    await axios
      .post("http://localhost:5000/upload_admin_post_image", formData)
      .then(async () => {
        await axios
          .get("http://localhost:5000/fetch_admin_post_image")
          .then((res) => {
            // console.log(res);
            setUserData({ ...userData, imageUrl: res.data });
            setImageLoader(false);
          });
      });
  }
  async function saveProfile() {
    const data = {
      ...userData,
      email: props.userData.email,
      imageUrl: userData.imageUrl,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      instagramId: userData.instagramId,
      linkedinId: userData.linkedinId,
      githubId: userData.githubId,
      domain: userData.domain,
      websiteUrl: userData.websiteUrl,
      companyName: userData.companyName,
      profession: userData.profession,
    };
    await axios
      // .post(`${LOCALHOST_URL}/save_profile_data`, formData)
      .post(
        `${LOCALHOST_URL}/save_profile_data`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        handleClose();
        props.setLoader();
      });
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Profile
      </Button>

      <Modal show={show} onHide={handleClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Image Preview */}
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
                  src={userData.imageUrl !== null ? userData.imageUrl : ""}
                  style={{ width: "200px", height: "200px" }}
                />
              )}
            </Form.Group>
            {/* Choose Image */}
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
            <div className="grid grid-cols-4">
              {/* First Name */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  rows={2}
                  defaultValue={userData.firstName}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      firstName: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              {/* Last Name */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userData.lastName}
                  rows={2}
                  onChange={(e) => {
                    setUserData({ ...userData, lastName: e.target.value });
                  }}
                />
              </Form.Group>
              {/* Phone Number */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userData.phoneNumber}
                  rows={2}
                  onChange={(e) => {
                    setUserData({ ...userData, phoneNumber: e.target.value });
                  }}
                />
              </Form.Group>
              {/* Batch */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Batch</Form.Label>
                <Form.Control
                  disabled
                  type="date"
                  defaultValue={userData.batch}
                  rows={2}
                  min="2000-01-01"
                  onChange={(e) => {
                    setUserData({ ...userData, batch: e.target.value });
                  }}
                />
              </Form.Group>
              {/* Department */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userData.department}
                  rows={2}
                  onChange={(e) => {
                    setUserData({ ...userData, department: e.target.value });
                  }}
                />
              </Form.Group>
              {/* Instagram Id */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Instagram Id</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userData.instagramId}
                  rows={2}
                  onChange={(e) => {
                    setUserData({ ...userData, instagramId: e.target.value });
                  }}
                />
              </Form.Group>
              {/* GitHub Id */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>GitHub Id</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userData.githubId}
                  rows={2}
                  onChange={(e) => {
                    setUserData({ ...userData, githubId: e.target.value });
                  }}
                />
              </Form.Group>
              {/* Linkedin Id */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Linkedin Id</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userData.linkedinId}
                  rows={2}
                  onChange={(e) => {
                    setUserData({ ...userData, linkedinId: e.target.value });
                  }}
                />
              </Form.Group>
              {/* Intrested Domain */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Interested Domain</Form.Label>
                <Form.Control
                  type="drop-down"
                  defaultValue={userData.domain}
                  rows={2}
                  onChange={(e) => {
                    setUserData({ ...userData, domain: e.target.value });
                  }}
                />
              </Form.Group>
              {/* Profession */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Profession</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userData.profession}
                  rows={2}
                  onChange={(e) => {
                    setUserData({ ...userData, profession: e.target.value });
                  }}
                />
              </Form.Group>
              {/* Company Name */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userData.companyName}
                  rows={2}
                  onChange={(e) => {
                    setUserData({ ...userData, companyName: e.target.value });
                  }}
                />
              </Form.Group>
              {/* Website Url */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Enter Website URL</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userData.websiteUrl}
                  rows={2}
                  onChange={(e) => {
                    setUserData({ ...userData, websiteUrl: e.target.value });
                  }}
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Not Now
          </Button>
          <UserProfileSaveModal saveProfile={() => saveProfile()} />
        </Modal.Footer>
      </Modal>
    </>
  );
}
