import React from "react";
import { Alert } from "@mui/material";
import useStyles from "./styles";

const Message = ({ typeOfMessage, message }) => {
  const classes = useStyles();
  return (
    <Alert className={classes.message} severity={typeOfMessage}>
      {message}
    </Alert>
  );
};

export default Message;
