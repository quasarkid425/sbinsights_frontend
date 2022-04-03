import { createSlice } from "@reduxjs/toolkit";

const chartState = {
  dashboardCharts: {},
  pieData: {},
};

const chartSlice = createSlice({
  name: "charts",
  initialState: chartState,
  reducers: {
    setDashBoardChart(state, action) {
      state.dashboardCharts = action.payload;
    },
    setPieData(state, action) {
      state.pieData = action.payload;
    },
  },
});

export const chartActions = chartSlice.actions;

export default chartSlice.reducer;
