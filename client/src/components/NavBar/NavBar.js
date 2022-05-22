import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@mui/material";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { auth } from "../Auth/firebase-config";
import { signOut } from "firebase/auth";

const NavBar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log(user);

  useEffect(() => {
    // const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  const signOutFromGoogle = () => {
    // signOut(auth).then(console.log("you have succesfully logged out"));
    // setUser(null);
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          aligh="center"
        >
          Ricordi
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.name} src={user.url}>
              {/* {user.name.chartAt(0)} */}
            </Avatar>
            <Typography className={classes.username} variant="h6">
              {user.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={signOutFromGoogle}
            >
              Sign out
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
