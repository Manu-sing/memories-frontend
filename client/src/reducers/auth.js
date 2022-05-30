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

export const signin = (setMessage, setTypeOfMessage, formData, navigate) => {
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
      await localStorage.setItem("token", JSON.stringify(user.token));
      postService.setToken(JSON.parse(localStorage.getItem("token")));
      navigate("/");
      setTypeOfMessage("success");
      setMessage(`Welcome ${user.result.name}.`);
      setTimeout(() => {
        setMessage(null);
        setTypeOfMessage(null);
      }, 6000);
    } catch (error) {
      setTypeOfMessage("error");
      setMessage("Login was unsuccessful. Try again.");
      setTimeout(() => {
        setMessage(null);
        setTypeOfMessage(null);
      }, 6000);
      console.log(error);
    }
  };
};

export const signup = (setMessage, setTypeOfMessage, formData, navigate) => {
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
      setTypeOfMessage("success");
      setMessage(`Welcome ${user.result.name}.`);
      setTimeout(() => {
        setMessage(null);
        setTypeOfMessage(null);
      }, 6000);
    } catch (error) {
      setTypeOfMessage("error");
      setMessage("Signup was unsuccessful. Try again.");
      setTimeout(() => {
        setMessage(null);
        setTypeOfMessage(null);
      }, 6000);
      console.log(error);
    }
  };
};

export default authSlice.reducer;
