import * as React from "react";
import "../BlurAnimation.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { createChatUser } from "../User/Chat/chat_api";

const theme = createTheme();

export default function SignUp() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [blur_count, setBlur_Count] = useState(10);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const emailValid =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  useEffect(() => {
    setTimeout(blur_count > 0 && setBlur_Count(blur_count - 0.5), 1000);
  }, [blur_count]);
  async function buttonClick() {
    await axios
      .post("http://127.0.0.1:5000/create_user", {
        data: { email, password, firstname, lastname, phone },
      })
      .then((res) => {
        console.log(res);
        createChatUser(email, password, firstname, lastname);
        navigate("/Login");
      })
      .catch((res) => {
        console.log(res);
      });
  }

  return (
    <>
      <div id="signup_blur_animation">
        <ThemeProvider theme={theme}>
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
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <div>
                      <TextField
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        onChange={(e) => {
                          setFirstname(e.target.value);
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phone"
                      label="Phone no"
                      name="phone"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (
                          e.target.value.length > 0 &&
                          confirmPassword !== e.target.value
                        ) {
                          setPasswordError(true);
                        } else {
                          setPasswordError(false);
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmpassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmpassword"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (
                          e.target.value.length > 0 &&
                          password !== e.target.value
                        ) {
                          setPasswordError(true);
                        } else {
                          setPasswordError(false);
                        }
                      }}
                    />
                    {passwordError && (
                      <span style={{ color: "red" }}>
                        Password doesnt match
                      </span>
                    )}
                  </Grid>
                </Grid>
                {emailValid.test(email) &&
                firstname.length > 2 &&
                lastname.length > 2 &&
                password.length > 5 &&
                passwordError === false ? (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => {
                      buttonClick();
                    }}
                  >
                    Sign Up
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled
                  >
                    Sign Up
                  </Button>
                )}
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    Already have an account?
                    <NavLink to="/login" variant="body2">
                      Sign in
                    </NavLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </>
  );
}
