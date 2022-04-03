import { createSlice } from "@reduxjs/toolkit";

const userState = {
  isLoggedIn: false,
  user: {},
};

const userSlice = createSlice({
  name: "users",
  initialState: userState,
  reducers: {
    setUser(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    userProfileUpdate(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = {};
    },

    addFirstService(state, action) {
      state.user.quickServices.push("");
    },
    addFirstDescription(state, action) {
      state.user.quickDescriptions.push("");
    },
    updateService(state, action) {
      const { type, index, value } = action.payload;
      switch (type) {
        case "service":
          state.user.quickServices[index] = value;
          break;
        case "description":
          state.user.quickDescriptions[index] = value;
          break;
      }
    },
    removeService(state, action) {
      state.user.quickServices.splice(action.payload, 1);
    },
    addService(state, action) {
      state.user.quickServices.push("");
    },
    removeDescription(state, action) {
      state.user.quickDescriptions.splice(action.payload, 1);
    },
    addDescription(state, action) {
      state.user.quickDescriptions.push("");
    },
    setInvoiceDetails(state, action) {
      const { entry } = action.payload;
      state.user.invoiceInfo.setUp = true;
      state.user.invoiceInfo.address = entry.address;
      state.user.invoiceInfo.city = entry.city;
      state.user.invoiceInfo.phone = entry.phone;
      state.user.invoiceInfo.signature = entry.signature;
      state.user.invoiceInfo.state = entry.state;
      state.user.invoiceInfo.zip = entry.zip;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
