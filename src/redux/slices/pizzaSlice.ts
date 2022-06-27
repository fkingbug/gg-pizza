import axios from 'axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Sort } from './filterSlice'

type Pizza = {
  id: string
  imageUrl: string
  title: string
  types: number[]
  sizes: number[]
  price: number
  category: number
  rating: number
}

export enum Status {
  LOADING = 'Loading',
  SUCCESS = 'Success',
  ERROR = 'Error',
}
interface pizzaSliceState {
  items: Pizza[]
  status: Status
}

export type SearchPizzaParam = {
  sortBy: string
  order: string
  category: string
  search: string
  currentPage: string
}

// export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParam>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params
    const { data } = await axios.get<Pizza[]>(
      `https://613e3b5094dbd600172abb2c.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
  }
)

const initialState: pizzaSliceState = {
  items: [],
  status: Status.LOADING,
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.items = action.payload
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

export const selectPizzaData = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
