import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import Sort from '../components/Sort'
import Categories from '../components/Categories'
import PizzaBLock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { useContext } from 'react'
import { SearchContext } from '../App'
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice'

const Home = () => {
  const dispatch = useDispatch()

  const [items, setItems] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const { searchValue } = useContext(SearchContext)
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter)

  const pizzas = items.map((e) => <PizzaBLock key={e.id} {...e} />)
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }
  useEffect(() => {
    setisLoading(true)
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''
    axios
      .get(
        `https://613e3b5094dbd600172abb2c.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data)
        setisLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sort.sortProperty, searchValue, currentPage])
  return (
    <>
      <div className='container'>
        <div className='content__top'>
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className='content__title'>Все пиццы</h2>
        <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  )
}

export default Home
