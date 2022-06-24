import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
  const { order, sortBy, category, search, currentPage } = params
  const { data } = await axios.get(
    `https://613e3b5094dbd600172abb2c.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
  )
  return data
})

const initialState = {
  items: [],
  status: '',
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.staus = 'Loading'
      state.items = []
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'Error'
      state.items = []
    },
  },
})

export const selectPizzaData = (state) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer