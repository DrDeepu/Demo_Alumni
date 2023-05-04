/* eslint-disable */
import "../BlurAnimation.css";
import "./Login.css";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./ImageUpload.css";
import LoginVideo from "./LoginVideo";
import Paper from "@mui/material/Paper";
import toast, { Toaster } from "react-hot-toast";
import { LOCALHOST_URL } from "../config";
import DoneIcon from "@mui/icons-material/Done";
const theme = createTheme();

export default function ForgotPassword() {
  const success_toast = () => {
    toast.dismiss();
    toast.success("Mail Sent.");
  };
  // eslint-disable-next-line
  const [result, setSetResult] = React.useState(false);
  const emailValid =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [email, setEmail] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // React.useEffect(() => {
  //   toast.dismiss();
  // }, []);
  async function sendOtp() {
    await axios({
      method: "post",
      url: `${LOCALHOST_URL}/valid_user`,
      data: { email },
    })
      .then((res) => {
        // setSetResult(true);
        toast.dismiss();
        toast.loading(res.data);

        axios({
          method: "post",
          url: `${LOCALHOST_URL}/send_otp`,
          data: { email },
        }).then(() => {
          setEmail("");
          success_toast();
          setSetResult(true);
        });
        // console.log(res)
      })
      .catch(() => {
        toast.dismiss();
        toast.error("No user found");
      });
  }

  return (
    <>
      <LoginVideo>
        <Toaster position={"top-center"} reverseOrder={false} />
        <div id={10 < 15 && "login_blur_animation"}>
          {/* THIS IS THE INITIAL PAGE */}
          {!result ? (
            <Box
              sx={{
                display: "flex",
                "& > :not(style)": {
                  m: 1,
                  width: 400,
                  height: 450,
                },
              }}
            >
              <Paper elevation={6}>
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
                        Reset Password
                      </Typography>
                      <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                      >
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        {emailValid.test(email) ? (
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => {
                              sendOtp();
                              // toast.loading("We are fetching you data");
                            }}
                          >
                            Confirm
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled
                          >
                            Confirm
                          </Button>
                        )}
                        <Grid container justifyContent="flex-end">
                          <Grid item>
                            <NavLink
                              to="/login"
                              variant="body2"
                              onClick={() => {
                                toast.dismiss();
                              }}
                            >
                              Back to login
                            </NavLink>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Container>
                </ThemeProvider>
                {/* </div> */}
              </Paper>
            </Box>
          ) : (
            // {/* THIS IS THE SUCCESSFULL PAGE */}
            <Box
              sx={{
                display: "flex",
                "& > :not(style)": {
                  m: 1,
                  width: 400,
                  height: 450,
                },
              }}
            >
              <Paper elevation={6}>
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
                      <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
                        <DoneIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                        Mail Sent
                      </Typography>
                      <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                      >
                        <NavLink
                          to="/login"
                          variant="body2"
                          onClick={() => {
                            toast.dismiss();
                          }}
                        >
                          <Button
                            type="submit"
                            fullWidth
                            variant="secondary"
                            sx={{ mt: 3, mb: 2 }}
                          >
                            Back to login
                          </Button>
                        </NavLink>
                      </Box>
                    </Box>
                  </Container>
                </ThemeProvider>
                {/* </div> */}
              </Paper>
            </Box>
          )}
        </div>
      </LoginVideo>
    </>
  );
}
