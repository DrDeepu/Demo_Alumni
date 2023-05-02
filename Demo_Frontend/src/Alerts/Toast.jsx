/* eslint-disable */

import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    // <Stack spacing={2} sx={{ width: "100%" }}>
    //   <Button variant="outlined" onClick={handleClick}>
    //     Open success snackbar
    //   </Button>
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "50%" }}>
        This is a success message!
      </Alert>
    </Snackbar>
    //   <Alert severity="error">This is an error message!</Alert>
    // </Stack>
  );
}
