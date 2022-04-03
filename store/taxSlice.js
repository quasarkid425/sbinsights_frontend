import { createSlice } from "@reduxjs/toolkit";

const taxState = {
  taxes: {},
  selectedStates: [],
};

const taxSlice = createSlice({
  name: "taxes",
  initialState: taxState,
  reducers: {
    setTax(state, action) {
      const { selectedStates, taxSetUp, taxStates } = action.payload;
      state.taxes.taxStates = taxStates;
      state.taxes.taxSetUp = taxSetUp;
      state.selectedStates = selectedStates;
    },
    addQuickStates(state, action) {
      const { index, abbrevation } = action.payload;
      const existingState = state.selectedStates.find(
        (state) => state.abbrevation === abbrevation
      );
      if (existingState) {
        return;
      } else {
        state.taxes.taxStates[index].selected = true;
        state.selectedStates.push(state.taxes.taxStates[index]);
      }
    },
    removeQuickStates(state, action) {
      const { index, abbrevation } = action.payload;
      const existingState = state.selectedStates.find(
        (state) => state.abbrevation === abbrevation
      );

      if (!existingState) {
        return;
      } else {
        const stateIndex = state.selectedStates.findIndex(
          (state) => state.abbrevation === abbrevation
        );
        state.taxes.taxStates[index].selected = false;
        state.selectedStates.splice(stateIndex, 1);
      }
    },
    setUpTax(state, action) {
      state.taxes.taxSetUp = true;
    },
  },
});

export const taxActions = taxSlice.actions;

export default taxSlice.reducer;
