/* eslint-disable */
import "../BlurAnimation.css";
import "./Login.css";
import "mdb-ui-kit/css/mdb.min.css";
import * as React from "react";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { store_access_token, store_user_email } from "../Redux/actions";
import { LOCALHOST_URL } from "../config";
import jwt_decode from "jwt-decode";
import LoginVideo from "./LoginVideo";
import Paper from "@mui/material/Paper";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const access_token = useSelector((state) => state.access_token.access_token);
  const user_email = useSelector((state) => state.set_user_data.user_email);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      const expired_or_not =
        new Date(jwt_decode(access_token).exp * 1000) > new Date();
      if (!expired_or_not) {
        localStorage.removeItem("access_token");
      } else {
        dispatch(store_access_token(access_token));

        // if (user_email === "admin@email.com")
        if (user_email) navigate("/admindashboard");
        else navigate("/profile");
      }
    }
  }, [access_token, user_email]);

  const emailValid =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  function validationFunction() {
    if (email !== "" && password !== "") {
      buttonClick();
    }
  }
  async function buttonClick() {
    await axios
      .post(`${LOCALHOST_URL}/login`, { email, password })
      .then((res) => {
console.log(res)
        if (res.data.status === 400) {
          toast.dismiss();
          toast.error(res.data.error);
        } else {
          dispatch(store_access_token(res.data.access_token));
          dispatch(store_user_email(res.data.access_token));
        }
      });
  }

  return (
    <>
      <LoginVideo>
        <Toaster position={"top-center"} reverseOrder={false} />
        <div id={"login_blur_animation"}>
          {/* <ThemeProvider theme={theme}> */}
          <Box
            sx={{
              display: "flex",
              "& > :not(style)": {
                m: 1,
                width: 500,
                height: 550,
              },
            }}
          >
            <Paper elevation={6}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Login
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          onChange={(e) =>
                            setEmail(e.target.value.toLowerCase())
                          }
                          required
                        />
                      </Grid>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={12}>
                        <TextField
                          onSubmit={() => alert("Hey there")}
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </Grid>
                    </Grid>
                    {emailValid.test(email) && password.length > 5 ? (
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={validationFunction}
                      >
                        Login
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={validationFunction}
                        disabled
                      >
                        Login
                      </Button>
                    )}
                    <div className="grid grid-cols-2">
                      <Grid item>
                        <NavLink to="/ForgotPassword" variant="body2">
                          Forgot Password ?
                        </NavLink>
                      </Grid>
                      <Grid item>
                        <NavLink to="/SignUp" variant="body2">
                          Join Alumni Network
                        </NavLink>
                      </Grid>
                    </div>
                  </Box>
                </Box>
              </Container>
            </Paper>
          </Box>
          {/* </ThemeProvider> */}
          {/* //   </div> */}
        </div>
      </LoginVideo>
    </>
  );
}
