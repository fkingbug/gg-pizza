import React from 'react'
import './scss/app.scss'
import Sort from './components/Sort'
import Header from './components/Header'
import Categories from './components/Categories'
import PizzaBLock from './components/PizzaBLock'
import pizzas from './assets/pizzas'

const App = () => {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            {pizzas.map((e) => (
              <PizzaBLock key={e.id} {...e} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
