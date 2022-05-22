import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { authData: null },
  reducers: {
    setAuth(state, action) {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      return { ...state, authData: action.payload };
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
