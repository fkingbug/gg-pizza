import React, { useEffect, useState } from 'react'
import Sort from '../components/Sort'
import Categories from '../components/Categories'
import PizzaBLock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'

const Home = () => {
  const [pizzas, setPizzas] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' })

  useEffect(() => {
    setisLoading(true)
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sortType.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    fetch(
      `https://613e3b5094dbd600172abb2c.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((response) => response.json())
      .then((json) => {
        setPizzas(json)
        setisLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortType])
  return (
    <>
      <div className='container'>
        <div className='content__top'>
          <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
          <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
        </div>
        <h2 className='content__title'>Все пиццы</h2>
        <div className='content__items'>
          {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : pizzas.map((e) => <PizzaBLock key={e.id} {...e} />)}
        </div>
      </div>
    </>
  )
}

export default Home