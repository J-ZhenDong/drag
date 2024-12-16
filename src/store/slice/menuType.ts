import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface MenuTypeState {
  collapsed: boolean;
}

const initialState: MenuTypeState = {
  collapsed: false,
};
export const menuTypeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleCollapsed: (state, action: { payload: MenuTypeState }) => {
      state.collapsed = action.payload.collapsed;
    },
  },
});
export const getMenuType = (state: RootState) => {
  return state.menuType;
};
export const { toggleCollapsed } = menuTypeSlice.actions;
export default menuTypeSlice.reducer;
