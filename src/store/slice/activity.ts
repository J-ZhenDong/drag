import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
type Activity = {
  activityName: string;
  activityId: number;
  date: string;
  address: string;
};
const initialState: Activity = {
  activityName: "英文脱口秀",
  activityId: 1111,
  date: "2024-11-02",
  address: "上海市浦东新区上海科技馆",
};
export const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setActivity(state, action: { payload: Activity }) {
      state.activityId = action.payload.activityId;
      state.activityName = action.payload.activityName;
      state.address = action.payload.address;
      state.date = action.payload.date;
    },
  },
});

export const getActivityInfo = (state: RootState) => {
  return state.acitivity
};
export const { setActivity } = activitySlice.actions;
export default activitySlice.reducer;
