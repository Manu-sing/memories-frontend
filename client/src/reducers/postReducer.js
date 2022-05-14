import { createSlice } from "@reduxjs/toolkit";
import posts from "../services/posts";
import postService from "../services/posts";

const postSlice = createSlice({
  name: posts,
  initialState: [],
  reducers: {
    setPosts(state, action) {
      return action.payload;
    },
    appendPost(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setPosts, appendPost } = postSlice.actions;

export const initialisePosts = () => {
  return async (dispatch) => {
    const posts = await postService.getAll();
    dispatch(setPosts(posts));
  };
};

export const createPost = (obj) => {
  return async (dispatch) => {
    try {
      const newPost = await postService.create(obj);
      dispatch(appendPost(newPost));
    } catch (error) {
      console.log("Could not save the new post");
    }
  };
};

export default postSlice.reducer;
