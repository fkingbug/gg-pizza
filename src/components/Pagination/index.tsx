import React, { FC } from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

type PaginationProp = {
  currentPage: number
  onChangePage: (id: number) => void
}

const Pagination: FC<PaginationProp> = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel='<'
    />
  )
}

export default Pagination
