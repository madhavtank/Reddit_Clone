import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { json, useNavigate } from "react-router-dom";
import axios from 'axios';

const theme = createTheme();

export default function SignIn(props) {

  const navigt = useNavigate();

  const [inp_mail, SetInp_mail] = useState("");
  const [inp_pass, Setpass] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var email = data.get('email');
    var passwd = data.get('password');

    if (!email || !passwd) {
      alert("Please fill all the reqiured fields")
    }

    var tosend = {
      email: email,
      password: passwd
    }

    axios.post('http://localhost:7000/login', tosend)
      .then((response) => {

        if (response.data === "wrong password") {
          alert("wrong password!!!")
        }
        else {
          window.localStorage.setItem("ok", "1")
          window.localStorage.setItem("info", JSON.stringify(response.data));
          const nav = () => navigt('/Dashboard')
          nav();
        }
      })
      .catch((err) => {
        alert("You are not registered yet")
      })
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const Validate = () => {
    if (inp_mail === '' || !validateEmail(inp_mail) || inp_pass === '') return 1;
    return 0;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              onChange={(e) => SetInp_mail(e.target.value)}
              value={inp_mail}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => Setpass(e.target.value)}
              value={inp_pass}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={Validate()}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant='outlined'
              onClick={() => props.onSwitch('signup')}
            >Don't have an account? Sign Up</Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}