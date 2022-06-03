import React from "react";
import { Alert } from "@mui/material";
import useStyles from "./styles";
import { useSelector } from "react-redux";

const Message = () => {
  const message = useSelector((state) => state.notification.message);
  const typeOfMessage = useSelector(
    (state) => state.notification.typeOfMessage
  );
  // get message and type of message from notificationReducer
  const classes = useStyles();
  return (
    <Alert className={classes.message} severity={typeOfMessage}>
      {message}
    </Alert>
  );
};

export default Message;
