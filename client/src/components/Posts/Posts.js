import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { Grid, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { removePost, likeAPost } from "../../reducers/postReducer";
import { setId } from "../../reducers/idReducer";

const Posts = () => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();

  const setCurrentId = (id) => {
    console.log(`I will update the post with the following current id: ${id}`);
    dispatch(setId(id));
  };

  const deletePost = (id) => {
    dispatch(removePost(id));
  };

  const likeThatPost = (id) => {
    const postToAddaLikeTo = posts.find((p) => p._id === id);
    const editedPost = {
      ...postToAddaLikeTo,
      likeCount: postToAddaLikeTo.likeCount + 1,
    };
    dispatch(likeAPost(id, editedPost));
  };

  if (!posts.length) {
    return <CircularProgress />;
  } else {
    return (
      <Grid
        className={classes.mainContainer}
        container
        alignItems="stretch"
        spacing={3}
      >
        {posts.map((p) => (
          <Grid item key={p._id} xs={12} sm={6}>
            <Post
              post={p}
              setCurrentId={() => setCurrentId(p._id)}
              removePost={() => deletePost(p._id)}
              likeThatPost={() => likeThatPost(p._id)}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
};

export default Posts;
