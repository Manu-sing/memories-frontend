import { createSlice } from "@reduxjs/toolkit";

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
export default authSlice.reducer;
