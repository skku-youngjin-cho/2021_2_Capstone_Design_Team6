import { Avatar, Button, CssBaseline, Grid, Paper, TextField } from '@material-ui/core';
import React, {useState} from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
      margin: theme.spacing(3, 0, 0),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));


const Signin = () => {
    const classes = Styles();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [state, setState] = useState(false);


    function loginUser(userData) {
        setState(true);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        }
        fetch('/signin', requestOptions)
        .then(response => response.json())
        .then(json =>{
            setState(false);
            signinValidate(json['msg']);
        })
        .catch(error => {
            setState(false);
            signinValidate(error);
        })
    }

    const handleSigninSubmit = () => {
        loginUser({
            name: username,
            pwd: password
        });
    }

    const signinValidate = (msg) => {
        if(msg === 'signin') {
            swal("Success", msg, "success", {
                buttons: false,
                timer: 2000,
        })
        .then((value) => {
            console.log(username)
            localStorage.setItem('username', username);
            window.location.href = `/${username}`;
            });
        }
        else{
            swal("Failed", msg, "error");
        }
    }

    const onSignup = () => {
        window.location.href = '/signup';
    }

    return (
        <div>
                <Grid container className={classes.root}>
                <CssBaseline />
                <Grid item xs={12} md={12} componenet={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography componenet="h1" variant="h5">
                            Sign in
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
                        <Button
                         type="submit"
                         fullWidth
                         variant="contained"
                         color="primary"
                         onClick={handleSigninSubmit}
                        >
                            Sign In
                        </Button>
                        <Button onClick={onSignup}
                         type="submit"
                         fullWidth
                         variant="contained"
                         color="primary"
                         className={classes.submit}
                        >
                            Sign Up
                        </Button>
                    </div>
                </Grid>
            </Grid>
            <Backdrop className={classes.backdrop} open={state}>
                <CircularProgress color='inherit' />
            </Backdrop>
        </div>
    )
}

export default Signin;