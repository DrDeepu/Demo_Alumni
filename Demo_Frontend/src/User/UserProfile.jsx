import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./UserNavBar";
import { useSelector, useDispatch } from "react-redux";
import { store_user_profile_data } from "../Redux/actions";
import { Loader } from "../React-Animations/ReactAnimations";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { LOCALHOST_URL } from "../config";
import UserEditProfile from "./UserEditProfile";

export default function ProfilePage() {
  const [user, setUser] = useState(false);
  const [loader, setLoader] = useState(true);
  const access_token = useSelector((state) => state.access_token.access_token);
  const user_email = useSelector((state) => state.set_user_data.user_email);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    //   git();
    profile();
  }, [loader]);

  //   async function git() {
  //     await axios("https://api.github.com/users/ChigsParmar007/repos")
  //       .then((res) => {
  //         setstate(res.data);
  //         setloader(false);
  //       })
  //       .catch((res) => {
  //         console.log(res);
  //       });
  //   }
  async function profile() {
    await axios
      .get(`${LOCALHOST_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        setUser(true);
        setUserData({
          firstName: res.data.firstname,
          lastName: res.data.lastname,
          email: res.data.email,
          phone: res.data.phone,
          password: res.data.password,
          batch: res.data.batch,
          department: res.data.department,
          instaId: res.data.instaid,
          linkedinId: res.data.linkedinid,
          githubId: res.data.gitid,
          domain: res.data.domain,
          profession: res.data.profession,
          company: res.data.company,
          websiteUrl: res.data.website,
          imageUrl: res.data.user_profile_image_url,
        });
        setLoader(false);
        setImageUrl(res.data.user_profile_image_url);
      })
      .catch((res) => {
        navigate("/login");
      });
  }
  dispatch(store_user_profile_data(userData));
  return user === "true" || user === true ? (
    loader === true ? (
      <Loader />
    ) : (
      <>
        <NavBar />
        <div id="user_profile_blur_animation">
          <section style={{ backgroundColor: "#eee" }}>
            <MDBContainer className="py-5">
              {/* <MDBRow> </MDBRow> */}

              <MDBRow>
                <MDBCol lg="4">
                  <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                      <Form>
                        {/* Image Group */}
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <div align="center">
                            <Image
                              src={
                                imageUrl !== null || imageUrl !== ""
                                  ? imageUrl
                                  : ""
                              }
                              style={{ width: "250px", height: "250px" }}
                            />
                          </div>
                        </Form.Group>
                      </Form>
                      <p className="text-muted mb-4">{userData.profession}</p>
                      <p className="text-muted mb-4">{userData.company}</p>
                    </MDBCardBody>
                  </MDBCard>
                  {/* Website, Instagram, Github Group */}
                  <MDBCard className="mb-4 mb-lg-0">
                    {/* Website, Instagram, Github */}
                    <MDBCardBody className="p-0">
                      <MDBListGroup flush className="rounded-3">
                        {/* Website Url */}
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon fas icon="globe fa-lg text-warning" />
                          <MDBCardText>
                            {userData.websiteUrl !== null &&
                            userData.websiteUrl !== ""
                              ? userData.websiteUrl
                              : "https://www.website.org"}
                          </MDBCardText>
                        </MDBListGroupItem>
                        {/* Git Hub Id */}
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon
                            fab
                            icon="github fa-lg"
                            style={{ color: "#333333" }}
                          />
                          <MDBCardText>
                            {userData.githubId
                              ? userData.githubId
                              : "no git_id"}
                          </MDBCardText>
                        </MDBListGroupItem>
                        {/* Insta Id */}
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon
                            fab
                            icon="instagram fa-lg"
                            style={{ color: "#ac2bac" }}
                          />
                          <MDBCardText>
                            {userData.instaId
                              ? userData.instaId
                              : "no insta_id"}
                          </MDBCardText>
                        </MDBListGroupItem>
                      </MDBListGroup>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                {/* This is List */}

                <MDBCol lg="8">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      {/* First Name */}
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>
                            <b>First Name</b>
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText >
                            {userData.firstName}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      {/* Last Name */}
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>
                            <b>Last Name</b>
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText >
                            {userData.lastName}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      {/* Email */}
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>
                            <b>Email</b>
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText >
                            {userData.email}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      {/* Phone No */}
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>
                            <b>Phone No</b>
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText >
                            {userData.phone}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      {/* Batch */}
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>
                            <b>Batch</b>
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText >
                            {userData.batch}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      {/* Department */}
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>
                            <b>Department</b>
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText >
                            {userData.department}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      {/* Intrested Domain */}
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>
                            <b>Interested Domain</b>
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText >
                            {userData.domain}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      {/* Current Company */}
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>
                            <b>Current Company</b>
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText >
                            {userData.company}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                    </MDBCardBody>
                    <UserEditProfile
                      userData={userData}
                      setLoader={() => {
                        setLoader(true);
                      }}
                    />
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
        </div>
      </>
    )
  ) : (
    navigate("/login")
  );
}
