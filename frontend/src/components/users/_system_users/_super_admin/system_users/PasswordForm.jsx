import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { updatePassword, reset } from "./../../../../../features/auth/authSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
let user_email;

const theme = createTheme({
  direction: 'rtl'
});

export default function SignIn() {
  const dispatch = useDispatch();
  const { isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("You have logged in successfully");
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const datas = localStorage.getItem("user");

    if (datas) {
      user_email = JSON.parse(datas).email;
    }

    const data = new FormData(event.currentTarget);
    const users = {
      email: user_email,
      old_password: data.get("old_password"),
      new_password: data.get("new_password"),
    };
    dispatch(updatePassword(users));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" dir="rtl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ mt: 4, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="old_password"
              placeholder="پخوانی پټ نوم ولیکی"
              type="password"
              id="old_password"
              autoComplete="current-password"
              variant="filled"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="new_password"
              placeholder="نوی پټ نوم ولیکی"
              type="password"
              id="new_password"
              autoComplete="current-password"
              variant="filled"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              لېږل
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
