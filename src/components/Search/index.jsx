import React from 'react'
import { useContext } from 'react'
import { SearchContext } from '../../App'

import styles from './Search.module.scss'

const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext)
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        id='Layer_1'
        version='1.1'
        viewBox='0 0 512 512'
        width='512px'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z' />
      </svg>
      <input
        onChange={(event) => setSearchValue(event.target.value)}
        value={searchValue}
        className={styles.input}
        placeholder='Поиск пиццы...'
      />
      {searchValue && (
        <svg
          className={styles.clearIcon}
          onClick={() => setSearchValue('')}
          version='1.1'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g id='info' />
          <g id='icons'>
            <path
              d='M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z'
              id='exit'
            />
          </g>
        </svg>
      )}
    </div>
  )
}

export default Search
