import { createSlice } from "@reduxjs/toolkit";
import postService from "../services/posts";
import { handleNotification } from "./notificationReducer";

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
      if (obj.title === "" || obj.creator === "" || obj.message === "") {
        const msg = {
          message: "The fields creator, title and message must be provided.",
          typeOfMessage: "warning",
        };
        dispatch(handleNotification(msg, 8000));

        return;
      }
      const newPost = await postService.create(obj);
      dispatch(appendPost(newPost));
      const msg = {
        message: "Your post was successfully created.",
        typeOfMessage: "success",
      };
      dispatch(handleNotification(msg, 8000));
    } catch (error) {
      const msg = {
        message:
          "Could not create the new post. You can only create a new post if you are signed in.",
        typeOfMessage: "success",
      };
      dispatch(handleNotification(msg, 8000));
      console.log(error);
    }
  };
};

export const removePost = (id) => {
  return async (dispatch) => {
    try {
      await postService.removeThePost(id);
      dispatch(detachPost(id));
      const msg = {
        message: "Your post was succesfully deleted.",
        typeOfMessage: "success",
      };
      dispatch(handleNotification(msg, 8000));
    } catch (error) {
      const msg = {
        message:
          "Could not delete the post. You can only delete a post if you are signed in and you were the one who created it.",
        typeOfMessage: "error",
      };
      dispatch(handleNotification(msg, 8000));
      console.log(error);
    }
  };
};

export const updatePost = (id, obj) => {
  return async (dispatch) => {
    try {
      const updatedPost = await postService.update(id, obj);
      dispatch(updateThePost(updatedPost));
    } catch (error) {
      const msg = {
        message:
          "Couldn't edit the post. You can only perform this action if you are signed in and you were the one who created the post.",
        typeOfMessage: "error",
      };
      dispatch(handleNotification(msg, 8000));
      console.log(error);
    }
  };
};

export const likeAPost = (id, obj) => {
  return async (dispatch) => {
    try {
      await postService.update(id, obj);
      dispatch(likeIt(id));
    } catch (error) {
      const msg = {
        message:
          "Couldn't like the post. You can only perform this action if you are signed in and you were the one who created the post.",
        typeOfMessage: "error",
      };
      dispatch(handleNotification(msg, 8000));
      console.log(error);
    }
  };
};

export default postSlice.reducer;
