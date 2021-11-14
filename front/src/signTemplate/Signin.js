import { Avatar, Button, CssBaseline, Grid, Paper, TextField } from '@material-ui/core';
import React, {useState} from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import { StylesContext } from '@material-ui/styles';

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
  }));

async function loginUser(userData) {
    return fetch('https://www.mecallapi.com/api/login', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
    .then(data => data.json())
}

//실습한 api 작동중
const Signin = () => {
    const classes = Styles();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSigninSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
            username,
            password
        });
        console.log(response);
        if('accessToken' in response) {
            swal("Success", response.message, "success", {
                buttons: false,
                timer: 2000,
            })
            .then((value) => {
                localStorage.setItem('username', username);
                window.location.href = `/${username}`;
            });
        } else {
            swal("Failed", response.message, "error");
        }
    }

    const onSignup = () => {
        window.location.href = '/signup';
    }

    return (
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
                    <form className={classes.form} noValidate onSubmit={handleSigninSubmit}>
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
                         className={classes.submit}
                        >
                            Sign In
                        </Button>
                    </form>
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
    )
}

export default Signin;