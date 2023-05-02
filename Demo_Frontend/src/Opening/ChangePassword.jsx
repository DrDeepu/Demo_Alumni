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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./ImageUpload.css";
import LoginVideo from "./LoginVideo";
import Paper from "@mui/material/Paper";
import toast, { Toaster } from "react-hot-toast";

import { LOCALHOST_URL } from "../config";
// import { set_user_data } from "../Redux/reducers";

const theme = createTheme();

export default function ChangePassword() {
  const navigate = useNavigate();
  // useEffect(() => {}, [access_token]);

  const location = useLocation();
  const urlParameters = new URLSearchParams(location.search);
  const token = urlParameters.get("token");
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  async function sendOtp() {
    await axios({
      method: "post",
      url: `${LOCALHOST_URL}/change_password`,
      data: { password: password.password, token },
    })
      .then(() => {
        toast.dismiss();
        toast.success("Password Changed. Redirecting to logging page");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((res) => {
        toast.dismiss();
        toast.error("Invalid user detected");
      });
  }

  return (
    <>
      <LoginVideo>
        <Toaster position={"top-center"} reverseOrder={false} />
        <div id={10 < 15 && "login_blur_animation"}>
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
                      Create New Password
                    </Typography>
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleSubmit}
                      sx={{ mt: 3 }}
                    >
                      <TextField
                        className="margin_bottom_5p"
                        fullWidth
                        type="password"
                        label="New Password"
                        name="email"
                        onChange={(e) =>
                          setPassword({ ...password, password: e.target.value })
                        }
                        required
                      />
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        name="email"
                        type="password"
                        onChange={(e) =>
                          setPassword({
                            ...password,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                      />
                      {password.password !== "" &&
                      password.confirmPassword !== "" &&
                      password.password === password.confirmPassword &&
                      password.password.length >= 6 &&
                      password.confirmPassword.length >= 6 ? (
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={() => {
                            sendOtp();
                          }}
                        >
                          Confrim
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
                          <NavLink to="/login" variant="body2">
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
        </div>
      </LoginVideo>
    </>
  );
}
