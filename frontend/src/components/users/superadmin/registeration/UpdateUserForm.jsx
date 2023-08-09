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

import Select from "@mui/material/Select";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, reset } from "../../../../features/auth/authSlice";

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
      password: data.get("password"),
      user_type,
    };
    dispatch(updateUser(userData));
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
              {/* Update User info */}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    variant="filled"
                    defaultValue={userToEdit.firstName}
                    // value={userToEdit.firstName}
                    // onChange={}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    variant="filled"
                    defaultValue={userToEdit.lastName}
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
                    type="email"
                    variant="filled"
                    value={userToEdit.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="New Password"
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
                    <InputLabel id="demo-simple-select-autowidth-label">
                      {userToEdit.user_type}
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      onChange={handleChange}
                      value={user_type}
                      autoWidth
                      sx={{ minWidth: 80, width: 400 }}
                    >
                      <MenuItem
                        value="superAdmin"
                        sx={{ minWidth: 80, width: 400 }}
                      >
                        Super Admin
                      </MenuItem>
                      <MenuItem value="admin" sx={{ minWidth: 80, width: 400 }}>
                        Admin
                      </MenuItem>
                      <MenuItem
                        value="viewer"
                        sx={{ minWidth: 80, width: 400 }}
                      >
                        Viewer
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
                    sx={{ mt: 5, mb: 2 }}
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8 }} />
        </Container>
      </ThemeProvider>
    </>
  );

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
}
