import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isAdmin = action.payload.isAdmin || false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.user = null;
      localStorage.removeItem("adminToken");
      localStorage.removeItem("userData");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
