import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export type Theme = 'dark' | 'light'
export interface ThemeState {
  theme: Theme
} 

const initialState: ThemeState = {
  theme: 'dark'
}
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state, action: { payload: ThemeState }) => {
      state.theme = action.payload.theme
    }
  }
})
export const getTheme = (state: RootState) => {
  return state.theme
}
export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer