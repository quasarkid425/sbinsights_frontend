import { createSlice } from "@reduxjs/toolkit";

const userState = {
  isLoggedIn: false,
  calledOnce: false,
  user: {},
  cityCount: [],
  viewHistory: {
    set: false,
    index: "",
  },
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
      state.calledOnce = false;
      state.viewHistory.set = false;
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
    calledTrue(state, action) {
      state.calledOnce = true;
    },
    viewHistoryTrue(state, action) {
      const { index } = action.payload;
      state.viewHistory.set = true;
      state.viewHistory.index = parseInt(index);
    },
    viewHistoryFalse(state, action) {
      state.viewHistory.set = false;
      state.viewHistory.index = "";
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
