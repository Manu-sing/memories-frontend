import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@mui/material";
import useStyles from "./styles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../Auth/firebase-config";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logOut } from "../../reducers/auth";

const NavBar = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();

  const signOutFromGoogle = () => {
    signOut(auth)
      .then(dispatch(logOut()))
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

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
            {user.token.length > 500 ? (
              <Avatar className={classes.purple} alt={user.name} src={user.url}>
                {/* {user.name.chartAt(0)} */}
              </Avatar>
            ) : null}

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
