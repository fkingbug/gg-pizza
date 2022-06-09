import React, { useEffect, useState } from 'react'
import Sort from '../components/Sort'
import Categories from '../components/Categories'
import PizzaBLock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'

const Home = () => {
  const [pizzas, setPizzas] = useState([])
  const [isLoading, setisLoading] = useState(true)
  useEffect(() => {
    fetch('https://613e3b5094dbd600172abb2c.mockapi.io/pizzas')
      .then((response) => response.json())
      .then((json) => {
        setPizzas(json)
        setisLoading(false)
      })
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <div className='container'>
        <div className='content__top'>
          <Categories />
          <Sort />
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
