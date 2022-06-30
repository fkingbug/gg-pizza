import { lazy, Suspense } from 'react'
import Loadable from 'react-loadable'
import './scss/app.scss'
import Home from './pages/Home'
// import Cart from './pages/Cart'
// import NotFound from './pages/NotFound'
// import FullPizza from './pages/FullPizza'
import { Route, Routes } from 'react-router-dom'
import MainLayouts from './layouts/MainLayouts'
// const Cart = lazy(() => import(/* webpackChunkName: 'Cart' */ './pages/Cart'))

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: 'Cart' */ './pages/Cart'),
  loading: () => <div>Загрузка...</div>,
})

const NotFound = lazy(() => import(/* webpackChunkName: 'NotFound' */ './pages/NotFound'))
const FullPizza = lazy(() => import(/* webpackChunkName: 'FullPizza' */ './pages/FullPizza'))

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayouts />}>
        <Route path='' element={<Home />} />
        <Route path='cart' element={<Cart />} />
        <Route
          path='pizza/:id'
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
