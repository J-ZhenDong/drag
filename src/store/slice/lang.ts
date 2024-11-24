import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
export type Lang = 'zh_CN' | 'en_US'
export interface LangState {
  lang: Lang
}
const initialState: LangState = {
  lang: 'zh_CN'
}
export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang(state, action: {payload: LangState}) {
      console.log('payload', action.payload);
      
      state.lang = action.payload.lang
    }
  }
})
export const getLang = (state: RootState) => {
  return state.lang
}
export const { setLang } = langSlice.actions
export default langSlice.reducer