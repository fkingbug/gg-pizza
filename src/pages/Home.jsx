import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Sort from '../components/Sort'
import Categories from '../components/Categories'
import PizzaBLock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { useContext } from 'react'
import { SearchContext } from '../App'
import { setCategoryId } from '../redux/slices/filterSlice'

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId)
  const dispatch = useDispatch()
  const [items, setItems] = useState([])
  const [isLoading, setisLoading] = useState(true)
  // const [categoryId, setCategoryId] = useState(0)
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' })
  const [currentPage, setcurrentPage] = useState(1)
  const { searchValue } = useContext(SearchContext)
  const pizzas = items.map((e) => <PizzaBLock key={e.id} {...e} />)
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
    console.log(id)
  }
  useEffect(() => {
    setisLoading(true)
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sortType.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''
    fetch(
      `https://613e3b5094dbd600172abb2c.mockapi.io/pizzas?page=${currentPage}&limit=3&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((response) => response.json())
      .then((json) => {
        setItems(json)
        setisLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue, currentPage])
  return (
    <>
      <div className='container'>
        <div className='content__top'>
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
        </div>
        <h2 className='content__title'>Все пиццы</h2>
        <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
        <Pagination onChangePage={(number) => setcurrentPage(number)} />
      </div>
    </>
  )
}

export default Home
