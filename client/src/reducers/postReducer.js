import { createSlice } from "@reduxjs/toolkit";
import postService from "../services/posts";

const postSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    setPosts(state, action) {
      return action.payload;
    },
    appendPost(state, action) {
      state.push(action.payload);
    },
    detachPost(state, action) {
      const id = action.payload;
      return state.filter((post) => post._id !== id);
    },
    updateThePost(state, action) {
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    likeIt(state, action) {
      const id = action.payload;
      const postToLike = state.find((post) => post._id === id);
      const likedPost = { ...postToLike, likeCount: postToLike.likeCount + 1 };
      return state.map((post) => (post._id === id ? likedPost : post));
    },
  },
});

export const { setPosts, appendPost, detachPost, updateThePost, likeIt } =
  postSlice.actions;

export const initialisePosts = () => {
  return async (dispatch) => {
    const posts = await postService.getAll();
    dispatch(setPosts(posts));
    console.log(posts);
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

export const removePost = (id) => {
  return async (dispatch) => {
    try {
      await postService.removeBlog(id);
      dispatch(detachPost(id));
    } catch (error) {
      console.log("Could not delete the post");
    }
  };
};

export const updatePost = (id, obj) => {
  return async (dispatch) => {
    const updatedPost = await postService.update(id, obj);
    dispatch(updateThePost(updatedPost));
  };
};

export const likeAPost = (id, obj) => {
  return async (dispatch) => {
    await postService.update(id, obj);
    dispatch(likeIt(id));
  };
};

export default postSlice.reducer;
