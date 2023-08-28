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

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";

import Select from "@mui/material/Select";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, reset } from "../../../../../features/auth/authSlice";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const theme = createTheme();

export default function UpdateUserForm({ userToEdit, handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user_type, setUser_type] = useState("");
  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password") ? data.get("password") : userToEdit.password,
      user_type: user_type ? user_type : userToEdit.user_type,
    };
    dispatch(updateUser(userData));
    handleClose()
  };

  const handleChange = (event) => {
    setUser_type(event.target.value);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
              dir="rtl"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    placeholder="نوم ولیکی"
                    variant="filled"
                    defaultValue={userToEdit.firstName}
                    sx={{ textAlign: "right" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    placeholder="تخلص"
                    name="lastName"
                    autoComplete="family-name"
                    variant="filled"
                    defaultValue={userToEdit.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                  dir="ltr"
                    required
                    fullWidth
                    id="email"
                    placeholder="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    variant="filled"
                    value={userToEdit.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    placeholder="نوی پټ نوم ولیکی"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    sx={{ minWidth: 80, width: 400 }}
                    variant="filled"
                  >
                    <Select
                      required
                      id="demo-simple-select-autowidth"
                      onChange={handleChange}
                      defaultValue={userToEdit.user_type}
                      autoWidth
                      sx={{ minWidth: 80, width: 400, textAlign: "right" }}
                    >
                      <MenuItem
                        value="superAdmin"
                        sx={{ minWidth: 80, width: 400 }}
                      >
                        مکمل صلاحیت
                      </MenuItem>
                      <MenuItem value="admin" sx={{ minWidth: 80, width: 400 }}>
                        محدو صلاحیت
                      </MenuItem>
                      <MenuItem
                        value="viewer"
                        sx={{ minWidth: 80, width: 400 }}
                      >
                        کتونکی
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 1, mb: 0 }}
                  >
                    تغیرول
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
