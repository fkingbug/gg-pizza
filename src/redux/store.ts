import { configureStore } from '@reduxjs/toolkit'
import cart from './cart/slice'
import filter from './filter/slice'
import pizza from './pizzas/slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
