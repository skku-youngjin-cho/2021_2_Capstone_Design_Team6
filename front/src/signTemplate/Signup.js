import { Avatar, Button, CssBaseline, Grid, Paper, TextField } from '@material-ui/core';
import React, {useState} from 'react';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';

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
  }));


//적용해야할 api 작동 불가 response가 원하는대로 나오지 않는듯
async function signupUser(userData) {
  fetch('http://52.79.173.249:8080/signup', {
      method: 'POST',
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
  })
  .then(response => response.json())
}


const Signup = () => {
  const classes = Styles();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();

  const userData = {
    name: username,
    pwd: password
  }

  const handleSignupSubmit = async e => {
    if(password === passwordCheck){
      const response = await signupUser({
          username,
          password
      });
      console.log(response);
      if('msg' in response) {
        swal("Success", response.msg, "success", {
          buttons: false,
          timer: 2000,
        })
        .then((value) => {
          window.location.href = '/';
        });
      } else{
        swal("Failed", response.msg, "error");
      }
    }
    else{
      swal("Failed", "Check Password", "error");
    }
  }

  return (
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
              <form className={classes.form} noValidate onSubmit={handleSignupSubmit}>
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
                  className={classes.submit}
                  >
                    Submit
                  </Button>
                </form>
              </div>
          </Grid>
      </Grid>
  )

}

export default Signup;