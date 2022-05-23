import React from "react";
import useStyles from "./styles";
import { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { signInWithGoogle } from "./firebase-config";
import { useDispatch } from "react-redux";
import { setAuth } from "../../reducers/auth";
import { useNavigate } from "react-router-dom";

const Auth = ({ setUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const classes = useStyles();

  const handleSubmit = () => {};

  const handleChange = () => {};

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    // if it doesn't work use this setShowPassword((prevShowPassword) => !prevShowPassword)
  };

  const switchMode = () => {
    setIsSignup(!isSignup);
    setShowPassword(false);
    console.log(isSignup);
  };

  const loginWithGoogle = () => {
    signInWithGoogle()
      .then((res) => {
        const name = res?.user.displayName;
        const email = res?.user.email;
        const url = res?.user.photoURL;
        const token = res?._tokenResponse.idToken;
        dispatch(
          setAuth({
            name,
            email,
            url,
            token,
          })
        );
        setUser(JSON.parse(localStorage.getItem("profile")));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        console.log("Login was unsuccesfull. Try again later.");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && ( // usable if you only want to show something in case your statement is true
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "password" : "text"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          {/* <GoogleLogin
            clientId="1006510176096-hr577fca6gjp64gb8sot17l7c589ratg.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
          <Button
            className={classes.googleButton}
            color="primary"
            variant="contained"
            fullWidth
            onClick={loginWithGoogle}
          >
            Google Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In."
                  : "Don't have an account? Sign Up."}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
