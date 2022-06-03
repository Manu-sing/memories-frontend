import React from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import memories from "../../../images/bali.jpeg";

const DefaultPost = () => {
  const classes = useStyles();

  return (
    <Card className={classes.defaultCard}>
      <CardMedia className={classes.media} image={memories} title="title" />
      <div className={classes.overlay}>
        <Typography variant="h6">
          Sign in and create beautiful posts like this one!
        </Typography>
        <Typography variant="body2">3 hours ago</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: "white" }} size="small">
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          #holidays #fun #relaxation
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        My holidays in Bali.
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          I had never seen such beautiful landscapes.
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;Like&nbsp;3
        </Button>
        <Button size="small" color="primary">
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default DefaultPost;
