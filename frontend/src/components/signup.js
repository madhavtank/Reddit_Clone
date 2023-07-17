import * as React from 'react';
import Avatar from '@mui/material/Avatar';
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
import axios from 'axios';
import { useState } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp(props) {

  const [inp_fname,Setfname] = useState("");
  const [inp_uname,Setuname] = useState("");
  const [inp_email,Setemail] = useState("");
  const [inp_age,Setage] = useState("");
  const [inp_con,Setcon] = useState("");
  const [inp_pass,Setpass] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const Valiadteage = () => {
    if(parseInt(inp_age)<=0) return 0;
    return inp_age.match(/^[1-9]?[0-9]{1}$|^100$/);
  }
  const Valiadtecon = () => {
    return inp_con.match(/^\d{10}$/);
  }

  const Valiadte = () => {
    if(inp_fname==='' || inp_uname==='' ||inp_pass==='') return 1;
    if(!validateEmail(inp_email)) return 1;
    if(isNaN(parseInt(inp_age))||isNaN(parseInt(inp_con))) return 1;
    if(!Valiadteage()) return 1;
    if(!Valiadtecon()) return 1;
    return 0;
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    var email=data.get('email')
    var password=data.get('password')
    var age=data.get('Age')
    var fname=data.get('firstName')
    var uname=data.get('User Name')
    var con_num=data.get('Contact Number')
    
    var num_age=parseInt(age);
    var num_con=parseInt(con_num);

    if(!email || !password || !age || !fname || !uname || !con_num)
    {
      alert("Please fill all the required fields")
    }
    else if(isNaN(num_age))
    {
      alert("age must be a number")
    }
    else if(isNaN(num_con))
    {
      alert("Contact Number must be a number")
    }
    else
    {

      var tosend = {
        email:email,
        password:password,
        age:num_age,
        fname:fname,
        lname:data.get('lastName'),
        uname:uname,
        contact:num_con
      }

      axios.post("http://localhost:7000/register",tosend)
      .then((response)=>{
        console.log(response);
        alert("Registered Successfully")
      })
      .catch((err)=>{
        console.log("hi")
        alert("duplicate email !")
      })

      props.onSwitch('login');
    }


  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e)=>Setfname(e.target.value)}
                  value={inp_fname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="last-name"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="User Name"
                  label="User Name"
                  name="User Name"
                  autoComplete="User Name"
                  onChange={(e)=>Setuname(e.target.value)}
                  value={inp_uname}
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
                  onChange={(e)=>Setemail(e.target.value)}
                  value={inp_email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Age"
                  label="Age"
                  name="Age"
                  autoComplete="Age"
                  onChange={(e)=>Setage(e.target.value)}
                  value={inp_age}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Contact Number"
                  label="Contact Number"
                  name="Contact Number"
                  autoComplete="Contact Number"
                  onChange={(e)=>{Setcon(e.target.value)}}
                  value={inp_con}
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
                  autoComplete="new-password"
                  onChange={(e)=>Setpass(e.target.value)}
                  value={inp_pass}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={Valiadte()}
            >
              Sign Up
            </Button>
            <Button
            fullWidth
            variant='outlined'
            onClick={()=>props.onSwitch('login')}
            >
            Already have an account? Sign in
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}