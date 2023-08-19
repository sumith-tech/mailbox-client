import { createSlice } from "@reduxjs/toolkit";

const initialEmail = localStorage.getItem("email");
const initialToken = localStorage.getItem("token");

const initialAuthState = {
  token: initialToken,
  isLoggedIn: !!initialToken,
  email: initialEmail,
  inbox: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const { token, email } = action.payload;
      state.token = token;
      state.isLoggedIn = true;
      state.email = email;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
    },
    logout(state) {
      state.email = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("email");
      localStorage.removeItem("token");
    },
    addinbox(state, action) {
      state.inbox = action.payload;
    },
    delete(state, action) {
      console.log(action.payload);
      state.inbox = state.inbox.filter((dlt) => dlt.id != action.payload);
    },
  },
});

export default authSlice;
export const authAction = authSlice.actions;
