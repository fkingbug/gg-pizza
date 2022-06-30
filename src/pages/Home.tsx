import React, { FC, useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import qs from 'qs'

import { sortList } from '../components/Sort'
import { Categories, SortPopap, Skeleton, PizzaBLock, Pagination } from '../components'

import { useAppDispatch } from '../redux/store'
import { selectFilter } from '../redux/filter/selectors'
import { selectPizzaData } from '../redux/pizzas/selectors'
import { setCategoryId, setCurrentPage } from '../redux/filter/slice'
import { fetchPizzas } from '../redux/pizzas/asyncActions'

const Home: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isSearch = useRef(false)
  const isMouted = useRef(false)

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)
  const { items, status } = useSelector(selectPizzaData)

  const pizzas = items.map((obj: any) => <PizzaBLock key={obj.id} {...obj} />)
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx))
  }, [])
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
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
        currentPage: String(currentPage),
      })
    )
  }
  // Если был 1 рендер  и пмоеняли url то меняй данные из url
  // useEffect(() => {
  //   if (isMouted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId: categoryId,
  //       currentPage: currentPage,
  //     })
  //     navigate(`?${queryString}`)
  //   }
  //   isMouted.current = true
  // }, [categoryId, sort.sortProperty, searchValue, currentPage])
  // // Если был первый рендер то  проверяем URL параметры и сохраняем в редуксе
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParam
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy)

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0],
  //       })
  //     )
  //     isSearch.current = true
  //   }
  // }, [])
  //Если был 1 рендер то запрашиваем пиццы
  useEffect(() => {
    getPizzas()
  }, [categoryId, sort.sortProperty, searchValue, currentPage])
  return (
    <>
      <div className='container'>
        <div className='content__top'>
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <SortPopap value={sort} />
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
