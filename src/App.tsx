import './scss/app.scss'
import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import FullPizza from './pages/FullPizza'
import { Route, Routes } from 'react-router-dom'
import MainLayouts from './layouts/MainLayouts'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayouts />}>
        <Route path='' element={<Home />} />
        <Route path='cart' element={<Cart />} />
        <Route path='pizza/:id' element={<FullPizza />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
