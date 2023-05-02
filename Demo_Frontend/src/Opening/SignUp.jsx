/* eslint-disable */
import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBDropdown,
} from "mdb-react-ui-kit";
import "mdb-ui-kit/css/mdb.min.css";
import "./SignupTest.css";
import "../BlurAnimation.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { createChatUser } from "../User/Chat/chat_api";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { store_access_token, store_user_email } from "../Redux/actions";
import {
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
function LoginTest() {
  // const [phone, setPhone] = React.useState("");

  const access_token = useSelector((state) => state.access_token.access_token);
  const user_email = useSelector((state) => state.set_user_data.user_email);
  const [passwordError, setPasswordError] = React.useState(false);
  const [dateError, setDateError] = React.useState(false);
  const dispatch = useDispatch();
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    batch: "",
    department: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const emailValid =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  React.useEffect(() => {
    if (localStorage.getItem("access_token")) {
      // console.log("ACCESS TOKEN", access_token);
      // console.log("USER EMAIL", user_email);
      const expired_or_not =
        new Date(jwt_decode(access_token).exp * 1000) > new Date();
      if (!expired_or_not) {
        localStorage.removeItem("access_token");
      } else {
        // console.log("JWT DECODE", jwt_decode(access_token));
        dispatch(store_user_email(access_token));
        if (user_email === "admin@email.com") navigate("/admindashboard");
        else navigate("/userdashboard");
      }
    }
    toast.dismiss();
    // eslint-disable-next-line
  }, [access_token, user_email, dateError]);

  async function buttonClick() {
    await axios
      .post("http://127.0.0.1:5000/create_user", {
        data: {
          ...signUpData,
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.data.status === 200) {
          toast.success("User registered successfully");
          setTimeout(() => {
            createChatUser(
              signUpData.email.toLowerCase(),
              signUpData.email.toLowerCase(),
              signUpData.firstName,
              signUpData.lastName
            );
            navigate("/Login");
          }, 2000);
        } else {
          toast.error("User email already exists");
        }
      });
  }

  return (
    <>
      <MDBContainer
        fluid
        className="p-16 background-radial-gradient overflow-hidden "
      >
        <Toaster position={"top-center"} reverseOrder={false} />
        <div id="signup_blur_animation">
          <MDBRow>
            <MDBCol
              md="6"
              className="text-center text-md-start d-flex flex-column justify-content-center"
            >
              <h1
                className="my-5 display-3 fw-bold ls-tight px-3"
                style={{ color: "hsl(218, 81%, 95%)" }}
              >
                Alumni Network <br />
                <span style={{ color: "hsl(218, 81%, 75%)" }}>
                  connect with memories
                </span>
              </h1>

              {/* <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
            Alumni Network created by Dr Rahul and 
          </p> */}
            </MDBCol>

            <MDBCol md="6" className="position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>

              <MDBCard className="my-5 bg-glass">
                <MDBCardBody className="p-5">
                  <MDBRow>
                    <MDBCol col="6">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="First name"
                        id="form1"
                        type="text"
                        onChange={(e) => {
                          setSignUpData({
                            ...signUpData,
                            firstName: e.target.value,
                          });
                        }}
                      />
                    </MDBCol>

                    <MDBCol col="6">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Last name"
                        id="form2"
                        type="text"
                        onChange={(e) =>
                          setSignUpData({
                            ...signUpData,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    {/* <MDBCol col="6">
                      <MDBDropdown>
                        <MDBInput
                          select
                          type="date"
                          min="2000-01-01"
                          max={new Date().toISOString().slice(0, 10)}
                          // value={dropdownValue}
                          // onChange={handleDropdownChange}
                          onChange={(e) =>
                            setSignUpData({
                              ...signUpData,
                              batch: e.target.value,
                            })
                          }
                          label="Batch"
                        />
                      </MDBDropdown>
                    </MDBCol> */}
                    <MDBCol col="6">
                      <MDBInput
                        select
                        type="number"
                        // min="2000"
                        // max={new Date().getFullYear() - 1}
                        // value={dropdownValue}
                        // onChange={handleDropdownChange}
                        onChange={(e) => {
                          if (
                            e.target.value >= 2000 &&
                            e.target.value <= new Date().getFullYear() - 1
                          ) {
                            setSignUpData({
                              ...signUpData,
                              batch: e.target.value,
                            });
                            setDateError(false);
                          } else {
                            setDateError(true);
                          }
                        }}
                        label="Batch"
                      />
                      {signUpData.batch !== "" && dateError === true && (
                        <span style={{ color: "red" }}>
                          Date must be between (2000 and{" "}
                          {new Date().getFullYear()})
                        </span>
                      )}
                    </MDBCol>

                    <MDBCol col="6">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Department"
                        id="form3"
                        type="text"
                        onChange={(e) =>
                          setSignUpData({
                            ...signUpData,
                            department: e.target.value,
                          })
                        }
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email"
                    id="form3"
                    type="text"
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        email: e.target.value,
                      })
                    }
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="form4"
                    type="password"
                    onChange={(e) => {
                      setSignUpData({
                        ...signUpData,
                        password: e.target.value,
                      });
                      if (
                        e.target.value.length > 0 &&
                        signUpData.confirmPassword !== "" &&
                        signUpData.confirmPassword !== e.target.value
                      ) {
                        setPasswordError(true);
                      } else {
                        setPasswordError(false);
                      }
                    }}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Confirm Password"
                    id="form4"
                    type="password"
                    onChange={(e) => {
                      setSignUpData({
                        ...signUpData,
                        confirmPassword: e.target.value,
                      });
                      if (
                        e.target.value.length > 0 &&
                        signUpData.password !== "" &&
                        signUpData.password !== e.target.value
                      ) {
                        setPasswordError(true);
                      } else {
                        setPasswordError(false);
                      }
                    }}
                  />
                  {passwordError && (
                    <span style={{ color: "red" }}>Password doesnt match</span>
                  )}
                  {emailValid.test(signUpData.email) &&
                  signUpData.firstName.length > 2 &&
                  signUpData.lastName.length > 2 &&
                  signUpData.password.length > 5 &&
                  signUpData.confirmPassword.length > 5 &&
                  passwordError === false ? (
                    <MDBBtn
                      className="w-100 mb-4"
                      size="md"
                      onClick={() => {
                        buttonClick();
                      }}
                    >
                      sign up
                    </MDBBtn>
                  ) : (
                    <MDBBtn disabled className="w-100 mb-4" size="md">
                      sign up
                    </MDBBtn>
                  )}
                  <span style={{ color: "hsl(218, 81%, 75%)" }}>
                    Already have an account
                  </span>
                  <NavLink to="/login">
                    <MDBBtn className="w-100 mb-4" size="md">
                      login
                    </MDBBtn>
                  </NavLink>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>
      </MDBContainer>
    </>
  );
}

export default LoginTest;
