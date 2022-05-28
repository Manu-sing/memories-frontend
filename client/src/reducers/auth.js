import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/signin";
import signupService from "../services/signup";
import postService from "../services/posts";

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
      postService.setToken(user.token);
      dispatch(
        setAuth({
          name: user.result.name,
          email: user.result.email,
          token: user.token,
        })
      );
      navigate("/");
    } catch (error) {
      console.log("Login was unsuccessful. Try again later.");
      console.log(error);
    }
  };
};

export const signup = (formData, navigate) => {
  return async (dispatch) => {
    try {
      const user = await signupService.registration(formData);
      postService.setToken(user.token);
      dispatch(
        setAuth({
          name: user.result.name,
          email: user.result.email,
          token: user.token,
        })
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
};

export default authSlice.reducer;
