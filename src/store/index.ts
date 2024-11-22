import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import roleReducer from './slice/role'

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType=void> =ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const store = configureStore({
  reducer: {
    role: roleReducer
  }
})
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = () => useSelector