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
  },
});

export const { setPosts } = postSlice.actions;

export const initialisePosts = () => {
  return async (dispatch) => {
    const posts = await postService.getAll();
    dispatch(setPosts(posts));
  };
};

export default postSlice.reducer;
