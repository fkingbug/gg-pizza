export type Pizza = {
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
export interface pizzaSliceState {
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
