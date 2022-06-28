import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Pizza, SearchPizzaParam } from './types'

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
