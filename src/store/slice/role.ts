import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
export type Role = 'admin' | 'super_admin' | 'normal'

interface BaseInfo {
  role: Role
  id: string
  phone: string
}
interface ExtraInfo {
  name: string
  avatar?: string
}

export type RoleState = BaseInfo & ExtraInfo

const initialState: RoleState = {
  id: '111',
  name: 'Jack',
  role: 'admin',
  phone: '77794110'
}
export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole(state, action: { payload: RoleState }) {
      state.id = action.payload.id
    }
  }
})
export const selectRole = (state: RootState) => {
  return state.role
}
export const { setRole } = roleSlice.actions
export default roleSlice.reducer
