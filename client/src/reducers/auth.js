import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/signin";
import signupService from "../services/signup";
// import postService from "../services/posts";
import { handleNotification } from "./notificationReducer";

const authSlice = createSlice({
  name: "auth",
  initialState: { authData: null },
  reducers: {
    setAuth(state, action) {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };
    },
    logOut(state, action) {
      localStorage.clear();
      return { ...state, authData: null };
    },
  },
});

export const { setAuth, logOut } = authSlice.actions;

export const signin = (formData, navigate) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(formData);
      await dispatch(
        setAuth({
          name: user.result.name,
          email: user.result.email,
          token: user.token,
        })
      );
      const msg = {
        message: `Welcome ${user.result.name}`,
        typeOfMessage: "success",
      };
      dispatch(handleNotification(msg, 8000));
      navigate("/");
    } catch (error) {
      const msg = {
        message: "Login was unsuccessful, try again.",
        typeOfMessage: "error",
      };
      dispatch(handleNotification(msg, 8000));
      console.log(error);
    }
  };
};

export const signup = (formData, navigate) => {
  return async (dispatch) => {
    try {
      const user = await signupService.registration(formData);
      dispatch(
        setAuth({
          name: user.result.name,
          email: user.result.email,
          token: user.token,
        })
      );
      const msg = {
        message: `Welcome ${user.result.name}`,
        typeOfMessage: "success",
      };
      dispatch(handleNotification(msg, 8000));
      navigate("/");
    } catch (error) {
      const msg = {
        message: "Signup was unsuccessful, try again.",
        typeOfMessage: "error",
      };
      dispatch(handleNotification(msg, 8000));
      console.log(error);
    }
  };
};

export default authSlice.reducer;
