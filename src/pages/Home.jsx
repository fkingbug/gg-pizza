import React, { useEffect, useState, useContext, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SearchContext } from '../App'
import { useNavigate } from 'react-router-dom'

import qs from 'qs'
import axios from 'axios'

import Sort, { sortList } from '../components/Sort'
import Categories from '../components/Categories'
import PizzaBLock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import { setItems, fetchPizzas } from '../redux/slices/pizzaSlice'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isSearch = useRef(false)
  const isMouted = useRef(false)
  // const [items, setItems] = useState([])
  // const [isLoading, setisLoading] = useState(true)
  const { searchValue } = useContext(SearchContext)
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter)
  const { items, status } = useSelector((state) => state.pizza)

  const pizzas = items.map((e) => <PizzaBLock key={e.id} {...e} />)
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''
    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    )
  }
  // Если был 1 рендер  и пмоеняли url то меняй данные из url
  useEffect(() => {
    if (isMouted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId: categoryId,
        currentPage: currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMouted.current = true
  }, [categoryId, sort.sortProperty, searchValue, currentPage])
  // Если был первый рендер то  проверяем URL параметры и сохраняем в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty)
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      )
      isSearch.current = true
    }
  }, [])
  //Если был 1 рендер то запрашиваем пиццы
  useEffect(() => {
    // window.scrollTo(0, 0)
    // if (!isSearch.current) {
    getPizzas()
    // }
    // isSearch.current = false
  }, [categoryId, sort.sortProperty, searchValue, currentPage])
  return (
    <>
      <div className='container'>
        <div className='content__top'>
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className='content__title'>Все пиццы</h2>
        {status === 'Error' ? (
          <div className='content__error-info'>
            <h2>Произошла ошибка 😕</h2>
            <p>К сожалению , не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
          </div>
        ) : (
          <div className='content__items'>{status === 'Loading' ? skeletons : pizzas}</div>
        )}
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  )
}

export default Home
