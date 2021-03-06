import React from "react";
import { Grow, Container, Grid } from "@mui/material";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";

const Home = () => {
  return (
    <Grow in>
      <Container>
        <Grid
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
  );
};

export default Home;
