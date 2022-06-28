export enum SortPropertEnam {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
}
export type Sort = {
  name: string
  sortProperty: SortPropertEnam
}
export interface FilterSliceState {
  searchValue: string
  categoryId: number
  currentPage: number
  sort: Sort
}
