import React from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
// import memories from "./images/memories.png";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialisePosts } from "./reducers/postReducer";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = createTheme();

  useEffect(() => {
    dispatch(initialisePosts());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxwidth="lg">
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className={classes.heading} variant="h2" aligh="center">
            Ricordi
          </Typography>
          {/* <img
            className={classes.image}
            src={memories}
            alt="memories"
            height="60"
          /> */}
        </AppBar>
        <Grow in>
          <Container>
            <Grid
              className={classes.mainContainer}
              container
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
                <Posts />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </ThemeProvider>
  );
};

export default App;
