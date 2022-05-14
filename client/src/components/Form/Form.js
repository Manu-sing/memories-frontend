import React from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { useState } from "react";
import FileBase from "react-file-base64";

const Form = () => {
  const [postInfo, setPostInfo] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyles();
  const handleSubmit = () => {};
  const clear = () => {};

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`{classes.root} {classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" textAlign="center">
          Creating a Memory
        </Typography>
        <TextField
          margin="dense"
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postInfo.creator}
          onChange={(e) =>
            setPostInfo({ ...postInfo, creator: e.target.value })
          }
        />
        <TextField
          margin="dense"
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postInfo.title}
          onChange={(e) => setPostInfo({ ...postInfo, title: e.target.value })}
        />
        <TextField
          margin="dense"
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postInfo.message}
          onChange={(e) =>
            setPostInfo({ ...postInfo, message: e.target.value })
          }
        />
        <TextField
          margin="dense"
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postInfo.tags}
          onChange={(e) => setPostInfo({ ...postInfo, tags: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostInfo({ ...postInfo, selectedFile: base64 })
            }
          />
        </div>
        <Box marginBottom={1}>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        </Box>
        <Box marginBottom={1}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Form;
