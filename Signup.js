import { Avatar, Button, CssBaseline, Grid, Paper, TextField } from '@material-ui/core';
import React, {useState} from 'react';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const Styles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));



const Signup = () => {
  const classes = Styles();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [state, setState] = useState(false);


  function signupUser(userData) {
    setState(true);
    const requestOptions = {
      method: 'POST',
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }
    fetch('/signup', requestOptions)
    .then(response=>response.json())
    .then(json=>{
      setState(false);
      signupValidate(json['msg']);
    })
    .catch(error => {
      setState(false);
      signupValidate(error)
    });
  }

  const handleSignupSubmit = () => {
    if(password === passwordCheck){
      signupUser({
          name: username,
          pwd: password
      });
    }else{
      swal("Failed", "Check Password", "error");
    }
  }

  const signupValidate = (msg) => {
    if(msg === 'signup') {
      swal("Success", msg, "success", {
        buttons: false,
        timer: 2000,
      })
       .then((value) => {
         window.location.href = '/';
       });
    } else{
      swal("Failed", msg, "error");
    }
  }

  return (
    <div>
      <Grid container className={classes.root}>
          <CssBaseline />
          <Grid item xs={12} md={12} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                  <AccountCircleOutlinedIcon />
              </Avatar>
              <Typography componenet="h1" variant="h5">
                  Sign Up
              </Typography>
                  <TextField
                       variant="outlined"
                       margin="normal"
                       required
                       fullWidth
                       id="email"
                       name="email"
                       label="Email Address"
                       onChange={e => setUsername(e.target.value)}
                  />
                  <TextField
                       variant="outlined"
                       margin="normal"
                       required
                       fullWidth
                       id="password"
                       name="password"
                       label="Password"
                       type="password"
                       onChange={e => setPassword(e.target.value)}
                  />
                  <TextField
                       variant="outlined"
                       margin="normal"
                       required
                       fullWidth
                       id="passwordCheck"
                       name="passwordCheck"
                       label="Confirm Password"
                       type="password"
                       onChange={e => setPasswordCheck(e.target.value)}
                  />
                  <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSignupSubmit}
                  >
                    Submit
                  </Button>
              </div>
          </Grid>
      </Grid>
      <Backdrop className={classes.backdrop} open={state}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )

}

export default Signup;